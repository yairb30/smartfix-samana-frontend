import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Repuesto } from '../models/repuesto';

@Injectable({
  providedIn: 'root',
})
export class RepuestoService {
  private repuestoUrl: string = 'http://localhost:8080/repuestos';

  constructor(private http: HttpClient) {}

  // Obtener todos los repuestos
  getRepuestos(): Observable<Repuesto[]> {
    return this.http.get<Repuesto[]>(this.repuestoUrl);
  }
  getAllPageable(page: number): Observable<any> {
    return this.http.get<any>(`${this.repuestoUrl}/page/${page}`);
  }

  // Obtener un repuesto por ID
  getRepuestoById(id: number): Observable<Repuesto> {
    return this.http.get<Repuesto>(`${this.repuestoUrl}/${id}`);
  }

  // Crear un nuevo repuesto
  createRepuesto(repuesto: Repuesto): Observable<Object> {
    return this.http.post(`${this.repuestoUrl}`, repuesto);
  }

  // Actualizar un repuesto
  updateRepuesto(id: number, repuesto: Repuesto): Observable<Object> {
    return this.http.put(`${this.repuestoUrl}/${id}`, repuesto);
  }

  // Eliminar un repuesto
  deleteRepuesto(id: number): Observable<any> {
    return this.http.delete(`${this.repuestoUrl}/${id}`, {
      responseType: 'text',
    });
  }

  // Buscar repuestos por nombre del repuesto
  getRepuesto(repuesto: string): Observable<Repuesto[]> {
    return this.http.get<Repuesto[]>(
      `${this.repuestoUrl}/search/repuesto?repuesto=${repuesto}`
    );
  }

  // Buscar repuestos por marca o modelo del celular
  getRepuestoByCelular(celular: string): Observable<Repuesto[]> {
    return this.http.get<Repuesto[]>(
      `${this.repuestoUrl}/search/celular?celular=${celular}`
    );
  }
}
