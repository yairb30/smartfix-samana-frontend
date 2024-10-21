import { Celular } from "./celular";
import { Cliente } from "./cliente";

export class Reparacion {

    id!: number;
    clienteId!: Cliente;
    celularId!: Celular;
    problema!: string;
    estado!: string;
    fechaIngreso!: Date;
    fechaEstimadaEntrega!: Date;
}
