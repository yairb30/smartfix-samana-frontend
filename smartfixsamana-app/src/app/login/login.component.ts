import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatError, MatFormField, MatFormFieldControl, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,MatCardModule, MatLabel, FormsModule, MatError,MatCardModule, MatFormField, MatInput],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    const credentials = { username: this.username, password: this.password };
    this.authService.login(credentials).subscribe(
      (response) => {
        sessionStorage.setItem('token', response.token);
        this.router.navigate(['/clientes']);
      },
      (error) => {
        this.errorMessage = 'Usuario o contraseña incorrectos.';
        console.error('Error al iniciar sesión', error);
      }
    );
  }
}
