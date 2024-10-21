import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Reparacion } from '../models/reparacion';
import { Cliente } from '../models/cliente';
import { Celular } from '../models/celular';
import { ReparacionService } from '../services/reparacion.service';
import { ClienteService } from '../services/cliente.service';
import { CelularService } from '../services/celular.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reparaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reparaciones.component.html',
  styleUrl: './reparaciones.component.css',
})
export class ReparacionesComponent implements OnInit {
  reparaciones!: Reparacion[];

  page: number = 0;
  totalPages!: number;

  clientes!: Cliente[];
  celulares!: Celular[];

  selectedReparacion: Reparacion | null = null;
  newReparacion: Reparacion = new Reparacion();
  isAdding: boolean = false;
  keyword: string = '';

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
    this.reparacionService.getAllPageable(this.page).subscribe((response) => {
      this.reparaciones = response.content;
      this.totalPages = response.totalPages;
    });
  }
  changePage(page: number): void{
    this.page = page;
    this.loadReparaciones();
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
          Swal.fire({
            title: 'Nueva reparación registrada!',
            text: 'Reparación registrada con exito!',
            icon: 'success',
          });
        });
    } else if (this.selectedReparacion) {
      const updatePayload = {
        id: this.selectedReparacion.id,
        clienteId: this.selectedReparacion.clienteId,
        celularId: this.selectedReparacion.celularId,
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
            Swal.fire({
              title: 'Actualizado',
              text: 'Reparación actualizada con exito!',
              icon: 'success',
            });
          },
        });
    }
  }

  delete(reparacionId: number): void {
    Swal.fire({
      title: 'Seguro que quieres eliminar la reparación?',
      text: 'La reparación será eliminada del sistema!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        this.reparacionService.deleteReparacion(reparacionId).subscribe(() => {
          this.loadClientes();
        });
        Swal.fire({
          title: 'Eliminado!',
          text: 'Reparación eliminada con exito',
          icon: 'success',
        });
      }
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

  // Método para buscar reparaciones por cliente o celular
  searchReparaciones(): void {
    if (this.keyword.trim() !== '') {
      this.reparacionService.getClienteByNombreApellido(this.keyword).subscribe(
        (data) => {
          this.reparaciones = data;
        },
        (error) => {
          console.error('Error al buscar por cliente', error);
        }
      );

      this.reparacionService.getReparacionByCelular(this.keyword).subscribe(
        (data) => {
          this.reparaciones = [...this.reparaciones, ...data]; // Combinar resultados
        },
        (error) => {
          console.error('Error al buscar por celular', error);
        }
      );
    } else {
      this.loadReparaciones(); // Si no hay keyword, obtener todos los repuestos
    }
  }
}
