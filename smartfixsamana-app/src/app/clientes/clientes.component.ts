import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent implements OnInit {
  clientes!: Cliente[];
  //paginacion
  page: number = 0; // Pagina actual
  totalPages!: number; // Total de paginas

  selectedCliente: Cliente | null = null;
  newCliente: Cliente = new Cliente();
  isAdding: boolean = false;

  searchTerm: any;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.clienteService.getAllPageable(this.page).subscribe((response) => {
      this.clientes = response.content; // Lista de clientes
      this.totalPages = response.totalPages; // Total de paginas
    });
  }
  changePage(page: number): void {
      this.page = page;
      this.loadClientes();
    
  }

  edit(cliente: Cliente): void {
    this.selectedCliente = { ...cliente };
    this.isAdding = false;
  }

  save(): void {
    if (this.isAdding) {
      this.clienteService.createCliente(this.newCliente).subscribe(() => {
        this.loadClientes();
        this.newCliente = new Cliente();
        this.isAdding = false;
        Swal.fire({
          title: 'Nuevo cliente creado!',
          text: 'Cliente creado con exito!',
          icon: 'success',
        });
      });
    } else if (this.selectedCliente) {
      this.clienteService
        .updateCliente(this.selectedCliente.id, this.selectedCliente)
        .subscribe(() => {
          this.loadClientes();
          this.selectedCliente = null;
          Swal.fire({
            title: 'Actualizado',
            text: 'Cliente editado con exito!',
            icon: 'success',
          });
        });
    }
  }

  delete(clienteId: number): void {
    Swal.fire({
      title: 'Seguro que quieres eliminar el cliente?',
      text: 'El cliente será eliminado del sistema!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.deleteCliente(clienteId).subscribe(() => {
          this.loadClientes();
        });
        Swal.fire({
          title: 'Eliminado!',
          text: 'Cliente eliminado con exito',
          icon: 'success',
        });
      }
    });
  }

  cancel(): void {
    this.selectedCliente = null;
    this.isAdding = false;
  }

  add(): void {
    this.isAdding = true;
    this.selectedCliente = null;
  }
  search(): void {
    if (this.searchTerm) {
      this.clienteService
        .getClienteByNombre(this.searchTerm)
        .subscribe((data: Cliente[]) => {
          this.clientes = data;
        });
    }
  }
}
