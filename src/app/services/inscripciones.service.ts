import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from "@angular/fire/compat/firestore";
import {Cliente, Inscripcion, InscripcionDetalle} from "../models";
import {Observable, of, zip} from "rxjs";
import {map} from "rxjs/operators";
import {ClientesService} from "./clientes.service";

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {
  private dbPath = 'inscripciones';
  inscripcionCollection: AngularFirestoreCollection<Inscripcion>;
  private itemDoc: AngularFirestoreDocument<Inscripcion>;
  item: Observable<Inscripcion>;

  constructor(private afs: AngularFirestore, private clientesService: ClientesService) {
    this.inscripcionCollection = afs.collection<Inscripcion>(this.dbPath);
  }

  getAll(): Observable<Inscripcion[]> {
    return this.inscripcionCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Inscripcion;
        data.id = a.payload.doc.id;
        return data
      }))
    );
  }

  // @ts-ignore
  getAllReferenced(): Observable<any>{
    let inscripcionDetalle: InscripcionDetalle;
    let inscripciones: InscripcionDetalle[] = [];

    return new Observable<InscripcionDetalle[]>((observer) => {
      this.afs.collection<any>('inscripciones').snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          data.id = a.payload.doc.id;
          return data
        }))
      ).subscribe(array => {
        // por cada cambio en inscripciones
        inscripciones.length = 0;
        for(let inscripcion of array){
          let clienteObservable = this.afs.doc<any>(inscripcion.cliente.path).valueChanges();
          let precioObservable = this.afs.doc<any>(inscripcion.precio.path).valueChanges();
          const observables = zip(
            clienteObservable,
            precioObservable,
          );
          observables.subscribe(val => {
            inscripcionDetalle = new InscripcionDetalle();
            inscripcionDetalle.clienteNombre = val[0].nombre;
            inscripcionDetalle.clienteApellido = val[0].apellido;
            inscripcionDetalle.tipoDuracion = val[1].tipoDuracion.toString();
            inscripcionDetalle.total = val[1].costo;
            inscripcionDetalle.fechaInicial = inscripcion.fechaInicial.toDate().toLocaleDateString('es-MX');
            inscripcionDetalle.fechaFinal = inscripcion.fechaFinal.toDate().toLocaleDateString('es-MX');
            inscripciones.push(inscripcionDetalle);
          });
        }
        //se proceso todo
        observer.next(inscripciones);
      });
    })
  }

  get(id: string): Observable<any>{
    this.itemDoc = this.afs.doc<Inscripcion>(`${this.dbPath}/${id}`);
    return this.itemDoc.valueChanges();
  }

  getRef(id:string): DocumentReference{
    return this.afs.doc<Inscripcion>(`${this.dbPath}/${id}`).ref;
  }

  create(inscripcion: Inscripcion): Promise<DocumentReference<Inscripcion>> {
    return this.inscripcionCollection.add(inscripcion);
  }

  update(id: string, data: Inscripcion): Promise<void>{
    return this.inscripcionCollection.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.inscripcionCollection.doc(id).delete();
  }
}
