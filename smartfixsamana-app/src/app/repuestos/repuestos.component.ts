import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Repuesto } from '../models/repuesto';
import { ListaRepuestos } from '../models/lista-repuestos';
import { Celular } from '../models/celular';
import { RepuestoService } from '../services/repuesto.service';
import { ListaRepuestosService } from '../services/lista-repuestos.service';
import { CelularService } from '../services/celular.service';
import { ListaRepuestosComponent } from "../lista-repuestos/lista-repuestos.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-repuestos',
  standalone: true,
  imports: [CommonModule, FormsModule, ListaRepuestosComponent],
  templateUrl: './repuestos.component.html',
  styleUrl: './repuestos.component.css',
})
export class RepuestosComponent implements OnInit {
  repuestos!: Repuesto[];
  listaRepuestos!: ListaRepuestos[];
  celulares!: Celular[];

  page: number = 0;
  totalPages!: number;

  selectedRepuesto: Repuesto | null = null;
  newRepuesto: Repuesto = new Repuesto();
  isAdding: boolean = false;
  searchRepuesto: string = '';

  constructor(
    private repuestoService: RepuestoService,
    private listRService: ListaRepuestosService,
    private celularService: CelularService
  ) {}

  ngOnInit(): void {
    this.loadRepuestos();
    this.loadListaRepuestos();
    this.loadCelulares();
  }

  loadRepuestos(): void {
    this.repuestoService.getAllPageable(this.page).subscribe(response => {
      this.repuestos = response.content;
      this.totalPages = response.totalPages;
    });
  }
  changePage(page: number): void{
    this.page = page;
    this.loadRepuestos();
  }

  loadListaRepuestos(): void {
    this.listRService.getListRepuestos().subscribe((data) => {
      this.listaRepuestos = data;
    });
  }

  loadCelulares(): void {
    this.celularService.getCelulares().subscribe((celulares) => {
      this.celulares = celulares;
    });
  }

  getListR(listR: ListaRepuestos): string {
    return listR ? `${listR.nombre} ${listR.detalles}` : '';
  }

  getCelular(celular: Celular): string {
    return celular ? `${celular.marca} ${celular.modelo}` : '';
  }

  edit(repuesto: Repuesto): void {
    this.selectedRepuesto = { ...repuesto };
    this.isAdding = false;
  }

  save(): void {
    if (this.isAdding) {
      this.repuestoService.createRepuesto(this.newRepuesto).subscribe(() => {
        this.loadRepuestos();
        this.newRepuesto = new Repuesto();
        this.isAdding = false;
        Swal.fire({
          title: 'Nuevo repuesto creado!',
          text: 'Repuesto creado con exito!',
          icon: 'success'
        });
      });
    } else if (this.selectedRepuesto) {
      const updatePayload = {
        id: this.selectedRepuesto.id,
        elegirRepuesto: this.selectedRepuesto.elegirRepuesto,
        elegirCelular: this.selectedRepuesto.elegirCelular,
      };
      this.repuestoService
        .updateRepuesto(updatePayload.id, updatePayload)
        .subscribe({
          next: () => {
            this.loadRepuestos();
            this.selectedRepuesto = null;
            Swal.fire({
              title: 'Actualizado',
              text: 'Repuesto editado con exito!',
              icon: 'success',
            });
          },
          error: (err) => {
            console.error('Error actualizando el repuesto:', err);
          },
        });
    }
  }

  delete(idRepuesto: number): void {
    Swal.fire({
      title: 'Seguro que quieres eliminar el repuesto?',
      text: 'El repuesto será eliminado del sistema!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.repuestoService.deleteRepuesto(idRepuesto).subscribe(() => {
        this.loadRepuestos();
        });
        Swal.fire({
          title: "Eliminado!",
          text: "Repuesto eliminado con exito",
          icon: "success"
        })
      }
    });
  }

  cancel(): void {
    this.selectedRepuesto = null;
    this.isAdding = false;
  }

  add(): void {
    this.isAdding = true;
    this.selectedRepuesto = null;
  }
 // Método para buscar repuestos por nombre o celular
 searchRepuestos(): void {
  if (this.searchRepuesto.trim() !== '') {
    this.repuestoService.getRepuesto(this.searchRepuesto).subscribe(
      (data) => {
        this.repuestos = data;
      },
      (error) => {
        console.error('Error al buscar por repuesto', error);
      }
    );

    this.repuestoService.getRepuestoByCelular(this.searchRepuesto).subscribe(
      (data) => {
        this.repuestos = [...this.repuestos, ...data]; // Combinar resultados
      },
      (error) => {
        console.error('Error al buscar por celular', error);
      }
    );
  } else {
    this.loadRepuestos(); // Si no hay busqueda especifica, obtener todos los repuestos
  }
}
}
