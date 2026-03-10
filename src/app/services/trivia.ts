import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InterfacePerguntas } from '../models/interface-perguntas';
import { Resposta } from '../models/resposta';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {

  private apiUrl = 'https://opentdb.com/api.php?amount=50&encode=url3986';

  constructor(private http: HttpClient) {}

  getPerguntas(): Observable<Resposta> {
    return this.http.get<Resposta>(this.apiUrl);
  }

}
