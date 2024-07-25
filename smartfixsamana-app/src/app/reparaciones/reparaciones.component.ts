import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Reparacion } from '../models/reparacion';
import { Cliente } from '../models/cliente';
import { Celular } from '../models/celular';
import { ReparacionService } from '../services/reparacion.service';
import { ClienteService } from '../services/cliente.service';
import { CelularService } from '../services/celular.service';

@Component({
  selector: 'app-reparaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reparaciones.component.html',
  styleUrl: './reparaciones.component.css',
})
export class ReparacionesComponent implements OnInit {
  reparaciones: Reparacion[] = [];
  clientes: Cliente[] = [];
  celulares: Celular[] = [];

  selectedReparacion: Reparacion | null = null;
  newReparacion: Reparacion = new Reparacion();
  isAdding: boolean = false;

  constructor(
    private reparacionService: ReparacionService,
    private clienteService: ClienteService,
    private celularService: CelularService
  ) {}

  ngOnInit(): void {
    this.loadReparaciones();
    this.loadClientes();
    this.loadCelulares();
  }

  loadReparaciones(): void {
    this.reparacionService.getReparaciones().subscribe((reparaciones) => {
      this.reparaciones = reparaciones;
    });
  }

  loadClientes(): void {
    this.clienteService.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }

  loadCelulares(): void {
    this.celularService.getCelulares().subscribe((celulares) => {
      this.celulares = celulares;
    });
  }

  getCliente(clienteId: number): string {
    const cliente = this.clientes.find((c) => c.id === clienteId);
    return cliente ? `${cliente.nombre} ${cliente.apellido}` : '';
  }

  getCelular(celularId: number): string {
    const celular = this.celulares.find((c) => c.id === celularId);
    return celular ? `${celular.marca} ${celular.modelo}` : '';
  }

  edit(reparacion: Reparacion): void {
    this.selectedReparacion = { ...reparacion };
    this.isAdding = false;
  }

  save(): void {
    if (this.isAdding) {
      this.reparacionService
        .createReparacion(this.newReparacion)
        .subscribe(() => {
          this.loadReparaciones();
          this.newReparacion = new Reparacion();
          this.isAdding = false;
        });
    } else if (this.selectedReparacion) {
      this.reparacionService
        .updateReparacion(this.selectedReparacion.id, this.selectedReparacion)
        .subscribe(() => {
          this.loadReparaciones();
          this.selectedReparacion = null;
        });
    }
  }

  delete(reparacionId: number): void {
    this.reparacionService.deleteReparacion(reparacionId).subscribe(() => {
      this.loadReparaciones();
    });
  }

  cancel(): void {
    this.selectedReparacion = null;
    this.isAdding = false;
  }

  add(): void {
    this.isAdding = true;
    this.selectedReparacion = null;
  }
}
