import { Celular } from "./celular";
import { ListaRepuestos } from "./lista-repuestos";

export class Repuesto {
  id!: number;
  elegirRepuesto!: ListaRepuestos;
  elegirCelular!: Celular;
}
