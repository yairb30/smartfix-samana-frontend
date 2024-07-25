import { Injectable } from '@angular/core';
import { Celular } from '../models/celular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CelularService {
  private celularUrl: string = 'http://localhost:8081/celulares';

  constructor(private http: HttpClient) {}

  getCelulares(): Observable<Celular[]> {
    return this.http.get<Celular[]>(this.celularUrl);
  }
  getCelularById(id: number): Observable<Celular> {
    return this.http.get<Celular>(`${this.celularUrl}/${id}`);
  }
  createCelular(celular: Celular): Observable<Object> {
    return this.http.post(`${this.celularUrl}`, celular);
  }
  updateCelular(id: number, value: Celular): Observable<object> {
    return this.http.put(`${this.celularUrl}/${id}`, value);
  }
  deleteCelular(id: number): Observable<any> {
    return this.http.delete(`${this.celularUrl}/${id}`, {
      responseType: 'text',
    });
  }
}
