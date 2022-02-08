import {DocumentReference} from "@angular/fire/compat/firestore";

export class Cliente {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  fechaNacimiento: Date;
  telefono: string;
  cedula: string;
  // ref: DocumentReference;
  visible: boolean;

  constructor() {
  }
}

export class Precios {
  id: string;
  duracion: number;
  nombre: string;
  tipoDuracion: number;
  costo: number;

  // ref: DocumentReference;
  constructor() {
  }
}

export class Inscripcion {
  id: string;
  fechaInicial: Date;
  fechaFinal: Date;
  cliente: DocumentReference;
  precio: DocumentReference;
  total: number;

  constructor() {
  }
}

export class InscripcionDetalle {
  id?:string;
  clienteNombre:string;
  clienteApellido:string;
  fechaInicial: string;
  fechaFinal: string;
  tipoDuracion: string;
  total: number;
}



