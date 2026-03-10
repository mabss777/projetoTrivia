import { Routes } from '@angular/router';
import { Quiz } from './pages/quiz/quiz';
import { Home } from './pages/home/home';

export const routes: Routes = [

   {
    path: 'quiz',
    component: Quiz
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: '',
    component: Home
  },
  {
    path: 'quiz/:difficulty',
    component: Quiz
  }
];
