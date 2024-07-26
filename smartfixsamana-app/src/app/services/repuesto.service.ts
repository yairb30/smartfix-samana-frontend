import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Repuesto } from '../models/repuesto';

@Injectable({
  providedIn: 'root',
})
export class RepuestoService {
  private repuestoUrl: string = 'http://localhost:8083/repuestos';

  constructor(private http: HttpClient) {}

  getRepustos(): Observable<Repuesto[]> {
    return this.http.get<Repuesto[]>(this.repuestoUrl);
  }
  getRepuestoById(id: number): Observable<Repuesto> {
    return this.http.get<Repuesto>(`${this.repuestoUrl}/${id}`);
  }
  createRepuesto(repuesto: Repuesto): Observable<Object> {
    return this.http.post(`${this.repuestoUrl}`, repuesto);
  }
  updateRepuesto(id: number, value: Repuesto): Observable<object> {
    return this.http.put(`${this.repuestoUrl}/${id}`, value);
  }
  deleteRepuesto(id: number): Observable<any> {
    return this.http.delete(`${this.repuestoUrl}/${id}`, {
      responseType: 'text',
    });
  }
  getRepuestosByMarca(marca: string): Observable<Repuesto[]> {
    return this.http.get<Repuesto[]>(
      `${this.repuestoUrl}/marca?marca=${marca}`
    );
  }
  getRepuestosByModelo(modelo: string): Observable<Repuesto[]> {
    return this.http.get<Repuesto[]>(
      `${this.repuestoUrl}/modelo?modelo=${modelo}`
    );
  }
}
