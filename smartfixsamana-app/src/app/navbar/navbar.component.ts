import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  onLogin(): void {
    // Lógica para iniciar sesión
    console.log('Iniciar sesión');
  }

  onLogout(): void {
    // Lógica para cerrar sesión
    console.log('Cerrar sesión');
  }
}
