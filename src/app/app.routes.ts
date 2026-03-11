import { Routes } from '@angular/router';
import { Quiz } from './pages/quiz/quiz';
import { Home } from './pages/home/home';

export const routes: Routes = [

  {
    path: 'home',
    component: Home
  },
  {
    path: 'quiz',
    component: Quiz
  },
  {
    path: '',
    component: Home
  }
];
