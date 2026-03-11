import { Component, OnInit } from '@angular/core';
import { TriviaService } from '../../services/trivia';
import { InterfacePerguntas } from '../../models/interface-perguntas';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  standalone: true,
  templateUrl: './quiz.html',
  imports: [CommonModule],
  styleUrls: ['./quiz.css']
})
export class Quiz implements OnInit {

  perguntas: InterfacePerguntas[] = [];
  perguntaAtual = 0;
  pontuacao = 0;
  respostas: string[] = [];

  rodadaAtual = 1;
  totalRodadas = 5;

  constructor(
    private triviaService: TriviaService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  // Busca perguntas da API
  ngOnInit() {

    this.triviaService.getPerguntas().subscribe(res => {

      console.log("API:", res);

      this.perguntas = res.results ?? [];

      console.log("Perguntas:", this.perguntas);

      if (this.perguntas.length > 0) {
        this.carregarRespostas();
        this.cdr.detectChanges();
      }

    });

  }

  // Junta respostas corretas + incorretas e embaralha
  carregarRespostas() {

    const pergunta = this.perguntas[this.perguntaAtual];

    if (!pergunta) return;

    this.respostas = [
      ...pergunta.incorrect_answers,
      pergunta.correct_answer
    ];

    this.respostas = this.respostas.sort(() => Math.random() - 0.5);

  }

  // Quando usuário responde
  responder(resposta: string) {

    const correta = this.perguntas[this.perguntaAtual].correct_answer;

    if (resposta === correta) {
      this.pontuacao++;
    }

    // verifica se terminou o quiz
    if (this.rodadaAtual >= this.totalRodadas) {

      this.router.navigate(['/result'], {
        state: {
          perguntas: this.perguntas,
          pontuacao: this.pontuacao
        }
      });

      return;
    }

    // próxima pergunta
    this.perguntaAtual++;
    this.rodadaAtual++;

    this.carregarRespostas();

  }

  // Decodifica texto da API
  decode(text: string) {
    return decodeURIComponent(text);
  }

}
