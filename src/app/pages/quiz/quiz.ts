import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TriviaService } from '../../services/trivia';
import { InterfacePerguntas } from '../../models/interface-perguntas';
import { CommonModule } from '@angular/common';
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
  totalRodadas = 5; // Definimos o limite fixo de 5 rodadas

  respostaSelecionada: string | null = null;
  mostrarResultado = false;

  constructor(
    private triviaService: TriviaService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.triviaService.getPerguntas().subscribe(res => {
      const todasAsPerguntas = res.results ?? [];
      this.perguntas = todasAsPerguntas.slice(0, this.totalRodadas); // vai gerar o numero de rodadas definidas

      if (this.perguntas.length > 0) {
        this.carregarRespostas();
        this.cdr.detectChanges();
      }
    });
  }

  carregarRespostas() {
    const pergunta = this.perguntas[this.perguntaAtual];
    if (!pergunta) return;

    this.respostas = [
      ...pergunta.incorrect_answers,
      pergunta.correct_answer
    ];

    this.respostas = this.respostas.sort(() => Math.random() - 0.5);
  }

  trackByFn(index: number, item: string) {
    return item;
  }

  responder(resposta: string) {
    if (this.mostrarResultado) return;

    const correta = this.perguntas[this.perguntaAtual].correct_answer;
    this.respostaSelecionada = resposta;
    this.mostrarResultado = true;

    if (resposta === correta) {
      this.pontuacao++;
    }

    setTimeout(() => {
      // Se a rodada atual chegou no limite (5), vai para o resultado
      if (this.rodadaAtual >= this.totalRodadas) {
        this.router.navigate(['/result'], {
          state: {
            perguntas: this.perguntas,
            pontuacao: this.pontuacao
          }
        });
        return;
      }

      // Caso contrário, avança para a próxima
      this.perguntaAtual++;
      this.rodadaAtual++;

      this.respostaSelecionada = null;
      this.mostrarResultado = false;

      this.carregarRespostas();
      this.cdr.detectChanges();

    }, 1000);
  }

  decode(text: string): string {
    if (!text) return '';
    try {
      const decodedUri = decodeURIComponent(text);
      const doc = new DOMParser().parseFromString(decodedUri, "text/html");
      return doc.documentElement.textContent || decodedUri;
    } catch (e) {
      return text;
    }
  }
}
