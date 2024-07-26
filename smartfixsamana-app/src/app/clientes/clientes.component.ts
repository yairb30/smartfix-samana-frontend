import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  selectedCliente: Cliente | null = null;
  newCliente: Cliente = new Cliente();
  isAdding: boolean = false;

  searchTerm: any;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.clienteService.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
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
      });
    } else if (this.selectedCliente) {
      this.clienteService
        .updateCliente(this.selectedCliente.id, this.selectedCliente)
        .subscribe(() => {
          this.loadClientes();
          this.selectedCliente = null;
        });
    }
  }

  delete(clienteId: number): void {
    this.clienteService.deleteCliente(clienteId).subscribe(() => {
      this.loadClientes();
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
      this.clienteService.getClienteByNombre(this.searchTerm).subscribe((data: Cliente[]) => {
        this.clientes = data;
      });
    }
  }
}
