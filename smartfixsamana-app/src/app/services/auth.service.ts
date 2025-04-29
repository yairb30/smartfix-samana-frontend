import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = 'http://localhost:8080/login';
  token: any;

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.url}`, credentials);
  }

  logout(): void {
    sessionStorage.removeItem('token'); // Eliminar el token al cerrar sesión
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }
}
