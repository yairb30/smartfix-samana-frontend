import { Component, OnInit } from '@angular/core';
import { Celular } from '../models/celular';
import { CelularService } from '../services/celular.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-celulares',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './celulares.component.html',
  styleUrl: './celulares.component.css',
})
export class CelularesComponent implements OnInit {
  celulares!: Celular[];

  page: number = 0;
  totalPages!: number;

  selectedCelular: Celular | null = null;
  newCelular: Celular = new Celular();
  isAdding: boolean = false;
  searchType: string = 'marca';
  searchTerm: string = '';
  selectedCliente: any;
  clientes: any;

  constructor(private celularService: CelularService) {}

  ngOnInit(): void {
    this.loadCelulares();
  }

  loadCelulares(): void {
    this.celularService.getAllPageable(this.page).subscribe((response) => {
      this.celulares = response.content;
      this.totalPages = response.totalPages;
    });
  }
  changePage(page: number): void {
    this.page = page;
    this.loadCelulares();
  }

  edit(celular: Celular): void {
    this.selectedCelular = { ...celular };
    this.isAdding = false;
  }

  save(): void {
    if (this.isAdding) {
      this.celularService.createCelular(this.newCelular).subscribe(() => {
        this.loadCelulares();
        this.newCelular = new Celular();
        this.isAdding = false;
        Swal.fire({
          title: 'Nuevo celular creado!',
          text: 'Celular creado con exito!',
          icon: 'success',
        });
      });
    } else if (this.selectedCelular) {
      this.celularService
        .updateCelular(this.selectedCelular.id, this.selectedCelular)
        .subscribe(() => {
          this.loadCelulares();
          this.selectedCelular = null;
          Swal.fire({
            title: 'Actualizado',
            text: 'Celular editado con exito!',
            icon: 'success',
          });
        });
    }
  }

  delete(celularId: number): void {
    Swal.fire({
      title: 'Seguro que quieres eliminar el celular?',
      text: 'El celular será eliminado del sistema!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        this.celularService.deleteCelular(celularId).subscribe(() => {
          this.loadCelulares();
        });
        Swal.fire({
          title: 'Eliminado!',
          text: 'Celular eliminado con exito',
          icon: 'success',
        });
      }
    });
  }

  cancel(): void {
    this.selectedCelular = null;
    this.isAdding = false;
  }

  add(): void {
    this.isAdding = true;
    this.selectedCelular = null;
  }
  search(): void {
    if (this.searchType === 'marca') {
      this.celularService
        .getCelularesByMarca(this.searchTerm)
        .subscribe((data: Celular[]) => {
          this.celulares = data;
        });
    } else if (this.searchType === '') {
      this.celularService
        .getCelularesByModelo(this.searchTerm)
        .subscribe((data: Celular[]) => {
          this.celulares = data;
        });
    }
  }
}
