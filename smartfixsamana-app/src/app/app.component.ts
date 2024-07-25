import { Component } from '@angular/core';
import {RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HttpClientModule, RouterModule,],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'smartfixsamana-app';
}
