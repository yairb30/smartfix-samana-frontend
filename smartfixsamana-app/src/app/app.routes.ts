import { provideRouter, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { CelularesComponent } from './celulares/celulares.component';
import { ReparacionesComponent } from './reparaciones/reparaciones.component';
import { RepuestosComponent } from './repuestos/repuestos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CatalogoRepuestosComponent } from './catalogo-repuestos/catalogo-repuestos.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard] },
  { path: 'celulares', component: CelularesComponent },
  { path: 'reparaciones', component: ReparacionesComponent },
  { path: 'repuestos', component: RepuestosComponent },
  { path: 'lista-repuestos', component: CatalogoRepuestosComponent },
];
export const routingProviders = [provideRouter(routes)];
