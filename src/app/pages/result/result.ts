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

    if (nav?.extras.state) {
      this.pontuacao = nav.extras.state['pontuacao'];
      this.perguntas = nav.extras.state['perguntas'];
    }
  }

  decode(text: string) {
    return decodeURIComponent(text);
  }

}
