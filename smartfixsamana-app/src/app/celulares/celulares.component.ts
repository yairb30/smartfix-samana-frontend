import { Component, OnInit } from '@angular/core';
import { Celular } from '../models/celular';
import { CelularService } from '../services/celular.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-celulares',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './celulares.component.html',
  styleUrl: './celulares.component.css',
})
export class CelularesComponent implements OnInit {
  celulares: Celular[] = [];
  selectedCelular: Celular | null = null;
  newCelular: Celular = new Celular();
  isAdding: boolean = false;
  searchType: string = 'marca';
  searchTerm: string = '';

  constructor(private celularService: CelularService) {}

  ngOnInit(): void {
    this.loadCelulares();
  }

  loadCelulares(): void {
    this.celularService.getCelulares().subscribe((celulares) => {
      this.celulares = celulares;
    });
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
      });
    } else if (this.selectedCelular) {
      this.celularService
        .updateCelular(this.selectedCelular.id, this.selectedCelular)
        .subscribe(() => {
          this.loadCelulares();
          this.selectedCelular = null;
        });
    }
  }

  delete(celularId: number): void {
    this.celularService.deleteCelular(celularId).subscribe(() => {
      this.loadCelulares();
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
