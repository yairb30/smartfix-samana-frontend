import { Injectable } from '@angular/core';
import { Reparacion } from '../models/reparacion';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReparacionService {
  private reparacionUrl: string = 'http://localhost:8080/reparaciones';

  constructor(private http: HttpClient) {}

  getReparaciones(): Observable<Reparacion[]> {
    return this.http.get<Reparacion[]>(this.reparacionUrl);
  }
  getAllPageable(page: number): Observable<any> {
    return this.http.get<any>(`${this.reparacionUrl}/page/${page}`);
  }
  getReparacionById(id: number): Observable<Reparacion> {
    return this.http.get<Reparacion>(`${this.reparacionUrl}/${id}`);
  }
  createReparacion(reparacion: Reparacion): Observable<Object> {
    return this.http.post(`${this.reparacionUrl}`, reparacion);
  }
  updateReparacion(id: number, reparacion: Reparacion): Observable<object> {
    return this.http.put(`${this.reparacionUrl}/${id}`, reparacion);
  }
  deleteReparacion(id: number): Observable<any> {
    return this.http.delete(`${this.reparacionUrl}/${id}`, {
      responseType: 'text',
    });
  }
  // Buscar reparacion por nombre o apellido del cliente
  getClienteByNombre(cliente: string): Observable<Reparacion[]> {
    return this.http.get<Reparacion[]>(
      `${this.reparacionUrl}/search/cliente?cliente=${cliente}`
    );
  }

  // Buscar repuestos por marca o modelo del celular
  getReparacionByCelular(celular: string): Observable<Reparacion[]> {
    return this.http.get<Reparacion[]>(
      `${this.reparacionUrl}/search/celular?celular=${celular}`
    );
  }
}
