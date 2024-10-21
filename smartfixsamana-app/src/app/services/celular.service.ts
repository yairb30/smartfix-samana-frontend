import { Injectable } from '@angular/core';
import { Celular } from '../models/celular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CelularService {
  private celularUrl: string = 'http://localhost:8080/celulares';

  constructor(private http: HttpClient) {}

  getCelulares(): Observable<Celular[]> {
    return this.http.get<Celular[]>(this.celularUrl);
  }
  getAllPageable(page: number): Observable<any> {
    return this.http.get<any>(`${this.celularUrl}/page/${page}`);
  }
  getCelularById(id: number): Observable<Celular> {
    return this.http.get<Celular>(`${this.celularUrl}/${id}`);
  }
  createCelular(celular: Celular): Observable<Object> {
    return this.http.post(`${this.celularUrl}`, celular);
  }
  updateCelular(id: number, celular: Celular): Observable<object> {
    return this.http.put(`${this.celularUrl}/${id}`, celular);
  }
  deleteCelular(id: number): Observable<any> {
    return this.http.delete(`${this.celularUrl}/${id}`, {
      responseType: 'text',
    });
  }
  getCelularesByMarca(marca: string): Observable<Celular[]> {
    return this.http.get<Celular[]>(`${this.celularUrl}/marca?marca=${marca}`);
  }
  getCelularesByModelo(modelo: string): Observable<Celular[]> {
    return this.http.get<Celular[]>(
      `${this.celularUrl}/modelo?modelo=${modelo}`
    );
  }
}
