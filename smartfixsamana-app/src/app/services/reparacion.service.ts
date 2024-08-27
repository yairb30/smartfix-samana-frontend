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
  getReparacionById(id: number): Observable<Reparacion> {
    return this.http.get<Reparacion>(`${this.reparacionUrl}/${id}`);
  }
  createReparacion(reparacion: Reparacion): Observable<Object> {
    return this.http.post(`${this.reparacionUrl}`, reparacion);
  }
  updateReparacion(id: number, value: Reparacion): Observable<object> {
    return this.http.put(`${this.reparacionUrl}/${id}`, value
);
  }
  deleteReparacion(id: number): Observable<any> {
    return this.http.delete(`${this.reparacionUrl}/${id}`);
  }
}
