import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-resultado',
  standalone: true,
  templateUrl: './result.html',
  styleUrls: ['./result.css'],
  imports: [CommonModule, RouterModule]
})
export class Result {

  pontuacao = 0;
  perguntas: any[] = [];

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();

// verifica se existem dados enviados pela navegação
    if (nav?.extras.state) {
      // recebe a pontuação enviada da página do quiz
      this.pontuacao = nav.extras.state['pontuacao'];
      // recebe as perguntas enviadas da página do quiz
      this.perguntas = nav.extras.state['perguntas'];
    }
  }

  decode(text: string) {
    return decodeURIComponent(text);
  }

}
