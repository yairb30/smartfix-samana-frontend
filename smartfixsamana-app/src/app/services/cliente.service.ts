import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private clienteUrl: string = 'http://localhost:8082/clientes';

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.clienteUrl);
  }
  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.clienteUrl}/${id}`);
  }
  createCliente(cliente: Cliente): Observable<Object> {
    return this.http.post(`${this.clienteUrl}`, cliente);
  }
  updateCliente(id: number, value: Cliente): Observable<object> {
    return this.http.put(`${this.clienteUrl}/${id}`, value);
  }
  deleteCliente(id: number): Observable<any> {
    return this.http.delete(`${this.clienteUrl}/${id}`, {
      responseType: 'text',
    });
  }
}
