import { Injectable } from '@angular/core';
import { Reparacion } from '../models/reparacion';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReparacionService {
  private clienteUrl: string = 'http://localhost:8080/reparaciones';

  constructor(private http: HttpClient) {}

  getReparaciones(): Observable<Reparacion[]> {
    return this.http.get<Reparacion[]>(this.clienteUrl);
  }
  getReparacionById(id: number): Observable<Reparacion> {
    return this.http.get<Reparacion>(`${this.clienteUrl}/${id}`);
  }
  createReparacion(reparacion: Reparacion): Observable<Object> {
    return this.http.post(`${this.clienteUrl}`, reparacion);
  }
  updateReparacion(id: number, value: Reparacion): Observable<object> {
    return this.http.put(`${this.clienteUrl}/${id}`, value);
  }
  deleteReparacion(id: number): Observable<any> {
    return this.http.delete(`${this.clienteUrl}/${id}`, {
      responseType: 'text',
    });
  }
}
