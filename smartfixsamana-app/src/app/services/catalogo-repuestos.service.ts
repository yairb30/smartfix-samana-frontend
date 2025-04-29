import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListaRepuestos } from '../models/lista-repuestos';

@Injectable({
  providedIn: 'root',
})
export class CatalogoRepuestosService {
  private lis_repuestosURL = 'http://localhost:8080/lis_repuestos';
  constructor(private http: HttpClient) {}

  getListRepuestos(): Observable<ListaRepuestos[]> {
    return this.http.get<ListaRepuestos[]>(this.lis_repuestosURL);
  }
  getLisRepuestosById(id: number): Observable<ListaRepuestos> {
    return this.http.get<ListaRepuestos>(`${this.lis_repuestosURL}/${id}`);
  }
  createListRepuesto(listRepuesto: ListaRepuestos): Observable<Object> {
    return this.http.post(`${this.lis_repuestosURL}`, listRepuesto);
  }
  updateListRepuesto(id: number, lis_repuestos: ListaRepuestos): Observable<object>{
    return this.http.put(`${this.lis_repuestosURL}/${id}`, lis_repuestos);
  }
  deleteListRepuestos(id: number): Observable<any>{
    return this.http.delete(`${this.lis_repuestosURL}/${id}`, {responseType: 'text'});
  }
}
