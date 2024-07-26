import { Component, OnInit } from '@angular/core';
import { Repuesto } from '../models/repuesto';
import { RepuestoService } from '../services/repuesto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-repuestos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './repuestos.component.html',
  styleUrl: './repuestos.component.css',
})
export class RepuestosComponent implements OnInit {
  repuestos: Repuesto[] = [];
  selectedRepuesto: Repuesto | null = null;
  newRepuesto: Repuesto = new Repuesto();
  isAdding: boolean = false;
  searchType: string = 'marca';
  searchTerm: string = '';

  constructor(private repuestoService: RepuestoService) {}

  ngOnInit(): void {
    this.loadRepuestos();
  }

  loadRepuestos(): void {
    this.repuestoService.getRepustos().subscribe((repuestos) => {
      this.repuestos = repuestos;
    });
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
      });
    } else if (this.selectedRepuesto) {
      this.repuestoService
        .updateRepuesto(this.selectedRepuesto.id, this.selectedRepuesto)
        .subscribe(() => {
          this.loadRepuestos();
          this.selectedRepuesto = null;
        });
    }
  }

  delete(repuestoId: number): void {
    this.repuestoService.deleteRepuesto(repuestoId).subscribe(() => {
      this.loadRepuestos();
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
  search(): void {
    if (this.searchType === 'marca') {
      this.repuestoService
        .getRepuestosByMarca(this.searchTerm)
        .subscribe((data: Repuesto[]) => {
          this.repuestos = data;
        });
    } else if (this.searchType === '') {
      this.repuestoService
        .getRepuestosByModelo(this.searchTerm)
        .subscribe((data: Repuesto[]) => {
          this.repuestos = data;
        });
    }
  }
}
