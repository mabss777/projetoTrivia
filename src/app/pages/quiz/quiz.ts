import { Component, OnInit } from '@angular/core';
import { TriviaService } from '../../services/trivia';
import { InterfacePerguntas } from '../../models/interface-perguntas';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-quiz',
  standalone: true,
  templateUrl: './quiz.html',
  imports:[CommonModule],
  styleUrls: ['./quiz.css']
})
export class Quiz implements OnInit {

  perguntas: InterfacePerguntas[] = [];
  perguntaAtual = 0;
  pontuacao = 0;
  respostas: string[] = [];

  constructor(
    private triviaService: TriviaService,
    private cdr: ChangeDetectorRef
  ) {}

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

  carregarRespostas() {
    const pergunta = this.perguntas[this.perguntaAtual];

    if (!pergunta) return;

    this.respostas = [
      ...pergunta.incorrect_answers,
      pergunta.correct_answer
    ];

    this.respostas = this.respostas.sort(() => Math.random() - 0.5);

    console.log(this.respostas)
  }

  responder(resposta: string) {
    const correta = this.perguntas[this.perguntaAtual].correct_answer;

    if (resposta === correta) {
      this.pontuacao++;
    }

    this.proximaPergunta();
  }

  proximaPergunta() {
    this.perguntaAtual++;

    if (this.perguntaAtual < this.perguntas.length) {
      this.carregarRespostas();
    } else {
      alert("Quiz finalizado! Pontuação: " + this.pontuacao);
    }
  }

  decode(text: string) {
    return decodeURIComponent(text);
  }

}
