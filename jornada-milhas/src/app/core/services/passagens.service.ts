import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Resultado } from '../types/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassagensService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPassagens(params: any): Observable<Resultado> {
    return this.http.get<Resultado>(`${this.apiUrl}/passagem/search`, { params })
  }
}
