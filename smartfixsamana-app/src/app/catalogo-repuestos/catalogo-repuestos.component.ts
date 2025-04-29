import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListaRepuestos } from '../models/lista-repuestos';
import { CatalogoRepuestosService } from '../services/catalogo-repuestos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'lista-repuestos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo-repuestos.component.html',
  styleUrl: './catalogo-repuestos.component.css'
})
export class CatalogoRepuestosComponent {

  listaRepuesto!: ListaRepuestos[];
  selectedListaRepuestos: ListaRepuestos | null = null;
  newListaRepuestos: ListaRepuestos = new ListaRepuestos();
  isAdding: boolean = false;


  searchTerm: any;

  constructor(private listaRservice: CatalogoRepuestosService) {}

  ngOnInit(): void {
    this.loadListaRepuestos();
  }

  loadListaRepuestos(): void {
    this.listaRservice.getListRepuestos().subscribe((data) => {
      this.listaRepuesto = data;
    });
  }

  edit(listR: ListaRepuestos): void {
    this.selectedListaRepuestos = { ...listR };
    this.isAdding = false;
  }

  save(): void {
    if (this.isAdding) {
      this.listaRservice.createListRepuesto(this.newListaRepuestos).subscribe(() => {
        this.loadListaRepuestos();
        this.newListaRepuestos = new ListaRepuestos();
        this.isAdding = false;
        Swal.fire({
          title: ' Se ha guardado exitosamente!',
          text: 'Repuesto creado',
          icon: 'success'
        });
      });
    } else if (this.selectedListaRepuestos) {
      this.listaRservice
        .updateListRepuesto(this.selectedListaRepuestos.id, this.selectedListaRepuestos)
        .subscribe(() => {
          this.loadListaRepuestos();
          this.selectedListaRepuestos= null;
          Swal.fire({
            title: 'Actualizado',
            text: 'Se ha editado con exito!',
            icon: 'success',
          });
        });
    }
  }

  delete(listRId: number): void{
    Swal.fire({
      title: 'Seguro que quieres eliminar el cliente?',
      text: 'El cliente será eliminado del sistema!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.listaRservice.deleteListRepuestos(listRId).subscribe(() => {
        this.loadListaRepuestos();
        });
        Swal.fire({
          title: "Eliminado!",
          text: "Pieza eliminado con exito",
          icon: "success"
        })
      }
    });

  }

  cancel(): void {
    this.selectedListaRepuestos = null;
    this.isAdding = false;
  }

  add(): void {
    this.isAdding = true;
    this.selectedListaRepuestos = null;
  }

}
