import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resposta } from '../models/resposta';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  // amount=50 -> pede 50 perguntas
  // encode=url3986 -> codifica os textos para evitar caracteres quebrados
  private apiUrl = 'https://opentdb.com/api.php?amount=50&encode=url3986';

  constructor(private http: HttpClient) {}

  // Observable<Resposta>: significa que ela retorna um fluxo de dados que será recebido depois (assíncrono)
  getPerguntas(): Observable<Resposta> {
    return this.http.get<Resposta>(this.apiUrl);
  }

}
