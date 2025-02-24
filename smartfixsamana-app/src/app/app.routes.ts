import { provideRouter, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { CelularesComponent } from './celulares/celulares.component';
import { ReparacionesComponent } from './reparaciones/reparaciones.component';
import { RepuestosComponent } from './repuestos/repuestos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListaRepuestosComponent } from './lista-repuestos/lista-repuestos.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'celulares', component: CelularesComponent },
  { path: 'reparaciones', component: ReparacionesComponent },
  { path: 'repuestos', component: RepuestosComponent },
  { path: 'lista-repuestos', component: ListaRepuestosComponent },
];
export const routingProviders = [provideRouter(routes)];
