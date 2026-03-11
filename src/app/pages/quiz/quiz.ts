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
  styleUrls: ['./quiz.css'],
})
export class Quiz implements OnInit {
  perguntas: InterfacePerguntas[] = [];
  perguntaAtual = 0;
  pontuacao = 0;
  respostas: string[] = [];

  rodadaAtual = 1;
  totalRodadas = 5;

  respostaSelecionada: string | null = null;
  mostrarResultado = false;
  bloquearClique = false;

  constructor(
    private triviaService: TriviaService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  // Busca as perguntas da API e inicia o quiz
  ngOnInit() {
    this.triviaService.getPerguntas().subscribe((res) => {
      console.log('API:', res);

      // salva perguntas vindas da API
      this.perguntas = res.results ?? [];

      console.log('Perguntas:', this.perguntas);

      // inicia primeira pergunta
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

    this.respostas = [...pergunta.incorrect_answers, pergunta.correct_answer];

    // embaralha respostas
    this.respostas = this.respostas.sort(() => Math.random() - 0.5);

    console.log(this.respostas);
  }

  // Verifica se acertou e chama próxima pergunta
responder(resposta: string) {

  if (this.bloquearClique) return;

  this.bloquearClique = true;
  this.respostaSelecionada = resposta;
  this.mostrarResultado = true;

  const correta = this.perguntas[this.perguntaAtual].correct_answer;

  if (resposta === correta) {
    this.pontuacao++;
  }

  setTimeout(() => {

    this.perguntaAtual++;
    this.rodadaAtual++;

    if (this.rodadaAtual > this.totalRodadas) {

      this.router.navigate(['/result'], {
        state: {
          pontuacao: this.pontuacao,
          perguntas: this.perguntas
         }
      });

      return;
    }

    this.carregarRespostas();

    this.respostaSelecionada = null;
    this.mostrarResultado = false;
    this.bloquearClique = false;

  }, 1500);

}

  // Avança rodada ou termina quiz
  proximaPergunta() {
    if (this.rodadaAtual >= this.totalRodadas) {
      this.router.navigate(['/result'], {
        state: { pontuacao: this.pontuacao },
      });

      return;
    }

    this.perguntaAtual++;
    this.rodadaAtual++;

    this.carregarRespostas();
  }

  // Decodifica texto da API
  decode(text: string) {
    return decodeURIComponent(text);
  }
}
