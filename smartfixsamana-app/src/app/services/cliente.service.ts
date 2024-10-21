import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private clienteUrl: string = 'http://localhost:8080/clientes';

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.clienteUrl);
  }

  getAllPageable(page: number): Observable<any>{
    return this.http.get<any>(`${this.clienteUrl}/page/${page}`);
  }
  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.clienteUrl}/${id}`);
  }
  createCliente(cliente: Cliente): Observable<Object> {
    return this.http.post(`${this.clienteUrl}`, cliente);
  }
  updateCliente(id: number, cliente: Cliente): Observable<object> {
    return this.http.put(`${this.clienteUrl}/${id}`, cliente);
  }
  deleteCliente(id: number) {
    return this.http.delete(`${this.clienteUrl}/${id}`, {
      responseType: 'text',
    });
  }
  getClienteByNombre(nombre: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(
      `${this.clienteUrl}/nombre?nombre=${nombre}`
    );
  }
}
