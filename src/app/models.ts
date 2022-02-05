import { DocumentReference } from '@angular/fire/firestore';

export class Cliente{
  id:string;
  nombre: string;
  apellido: string;
  correo: string;
  fechaNacimiento: Date;
  telefono: string;
  cedula: string;
  // ref: DocumentReference;
  visible: boolean;
  constructor()
  {
  }
}

export class Precios{
  id: string;
  duracion: number;
  nombre: string;
  tipoDuracion: number;
  costo: number;
  // ref: DocumentReference;
  constructor()
  {

  }

}

