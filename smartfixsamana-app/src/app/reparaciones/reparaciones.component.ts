import { Component, OnInit } from '@angular/core';
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
  searchTerm: any;

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

  getCliente(cliente: Cliente): string {
    return cliente ? `${cliente.nombre} ${cliente.apellido}` : '';
  }

  getCelular(celular: Celular): string {
    
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
      const updatePayload = {
        id: this.selectedReparacion.id,
        clienteId: this.selectedReparacion.clienteId.id,
        celularId: this.selectedReparacion.celularId.id,
        problema: this.selectedReparacion.problema,
        estado: this.selectedReparacion.estado,
        fechaIngreso: this.selectedReparacion.fechaIngreso,
        fechaEstimadaEntrega: this.selectedReparacion.fechaEstimadaEntrega,
      };

      this.reparacionService
        .updateReparacion(updatePayload.id, updatePayload)
        .subscribe({
          next: () => {
            this.loadReparaciones();
            this.selectedReparacion = null;
          },
          error: (err) => {
            console.error('Error actualizando la reparación:', err);
          },
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

  search(): void {
    if (this.searchTerm) {
      this.reparacionService
        .getReparacionById(this.searchTerm)
        .subscribe((data: Reparacion) => {
          this.reparaciones = [data];
        });
    } else {
      this.loadReparaciones();
    }
  }
}
