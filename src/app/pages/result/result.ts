import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resultado',
  standalone: true,
  templateUrl: './result.html',
  imports: [CommonModule]
})
export class Result {

  perguntas: any[] = [];
  pontuacao = 0;

  constructor() {
    const dados = history.state;

    this.perguntas = dados.perguntas ?? [];
    this.pontuacao = dados.pontuacao ?? 0;
  }

}
