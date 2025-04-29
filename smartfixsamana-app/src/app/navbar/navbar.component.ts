// import { Component } from '@angular/core';
// import { Router, RouterModule } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [RouterModule],
//   templateUrl: './navbar.component.html',
//   styleUrl: './navbar.component.css',
// })
// export class NavbarComponent {

//   constructor(private authService: AuthService, private router: Router) {}

//   onLogin(): void {
//     this.router.navigate(['/login']);
//   }

//   onLogout(): void {
//     this.authService.logout();
//     this.router.navigate(['/login']);
//   }

//   isLoggedIn(): boolean {
//     return this.authService.isLoggedIn();
//   }
// }

import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule,} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,MatToolbar, MatToolbarModule, MatIconModule, MatMenuModule,],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.router.navigate(['/login']);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}


