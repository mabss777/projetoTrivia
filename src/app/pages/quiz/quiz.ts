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
  rodadaAtual = 1;
  totalRodadas = 5;


  constructor(
    private triviaService: TriviaService,
    private cdr: ChangeDetectorRef
  ) {}

  //Busca as perguntas da API e inicia o quiz carregando a primeira pergunta.
  ngOnInit() {
    this.triviaService.getPerguntas().subscribe(res => {
      console.log("API:", res);

      // Salva as perguntas recebidas da API
      this.perguntas = res.results ?? [];

      console.log("Perguntas:", this.perguntas);

      // Se existirem perguntas, inicia o jogo carregando as respostas
      if (this.perguntas.length > 0) {
        this.carregarRespostas();
        this.cdr.detectChanges();
      }
    });
  }

  // Junta respostas corretas e incorretas e embaralha a ordem delas.
  carregarRespostas() {
    const pergunta = this.perguntas[this.perguntaAtual];

    if (!pergunta) return;

    this.respostas = [
      ...pergunta.incorrect_answers,
      pergunta.correct_answer
    ];

    // Embaralha as alternativas para que não apareçam sempre na mesma ordem
    this.respostas = this.respostas.sort(() => Math.random() - 0.5);

    console.log(this.respostas)
  }

  // Verifica se a resposta está correta e atualiza a pontuação.
  responder(resposta: string) {
    const correta = this.perguntas[this.perguntaAtual].correct_answer;

    if (resposta === correta) {
      this.pontuacao++;
    }
    this.proximaPergunta();
  }

  // Move para a próxima pergunta e verifica se o jogo ainda continua ou termina.
  proximaPergunta() {
    this.perguntaAtual++;
    this.rodadaAtual++;

    if (this.perguntaAtual < this.perguntas.length && this.rodadaAtual <= this.totalRodadas) {
      this.carregarRespostas();
    } else {
      alert("Quiz finalizado! Pontuação: " + this.pontuacao);
    }
  }

  // Decodifica textos vindos da API (que chegam codificados em URL)
  decode(text: string) {
    return decodeURIComponent(text);
  }

}
