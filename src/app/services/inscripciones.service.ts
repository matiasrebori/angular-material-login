import {Injectable} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from "@angular/fire/compat/firestore";
import {Inscripcion, InscripcionDetalle} from "../models";
import {Observable, zip} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {
  private dbPath = 'inscripciones';
  inscripcionCollection: AngularFirestoreCollection<Inscripcion>;
  private itemDoc: AngularFirestoreDocument<Inscripcion>;
  item: Observable<Inscripcion>;

  constructor(private afs: AngularFirestore,) {
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

  get(id: string): Observable<any> {
    this.itemDoc = this.afs.doc<Inscripcion>(`${this.dbPath}/${id}`);
    return this.itemDoc.valueChanges();
  }

  getRef(id: string): DocumentReference {
    return this.afs.doc<Inscripcion>(`${this.dbPath}/${id}`).ref;
  }

  create(inscripcion: Inscripcion): Promise<DocumentReference<Inscripcion>> {
    return this.inscripcionCollection.add(inscripcion);
  }

  update(id: string, data: Inscripcion): Promise<void> {
    return this.inscripcionCollection.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.inscripcionCollection.doc(id).delete();
  }

  getAllReferenced(): Observable<InscripcionDetalle[]> {
    /**
     * Traer los datos de las inscripciones con snapshotChanges
     */
      //array a devolver
    let inscripciones: InscripcionDetalle[] = [];
    // objeto a guardar en array
    let inscripcionDetalle: InscripcionDetalle;
    // cantidad de inscripciones
    let cantidadProcesar: number;
    let contador: number = 0;

    //retornar observable
    return new Observable<InscripcionDetalle[]>((observer) => {
      //coleccion inscripciones con metadata
      this.afs.collection<any>(this.dbPath).snapshotChanges().pipe(
        //mapear datos
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          data.id = a.payload.doc.id;
          return data
        }))
        //suscribirse a los cambios en inscripciones
      ).subscribe(array => {
        inscripciones.length = 0;
        cantidadProcesar = array.length;
        // por cada elemento en inscripciones
        for (let inscripcion of array) {
          // datos de cliente y precio observables
          let clienteObservable = this.afs.doc<any>(inscripcion.cliente.path).valueChanges();
          let precioObservable = this.afs.doc<any>(inscripcion.precio.path).valueChanges();
          //esperar por los dos observables
          const observables = zip(
            clienteObservable,
            precioObservable,
          );
          observables.subscribe(val => {
            //cuando se tienen respuesta de los dos observables, extraer datos y guardar
            inscripcionDetalle = new InscripcionDetalle();
            inscripcionDetalle.clienteNombre = val[0].nombre;
            inscripcionDetalle.clienteApellido = val[0].apellido;
            inscripcionDetalle.tipoDuracion = val[1].tipoDuracion.toString();
            inscripcionDetalle.total = val[1].costo;
            inscripcionDetalle.fechaInicial = inscripcion.fechaInicial.toDate().toLocaleDateString('es-MX');
            inscripcionDetalle.fechaFinal = inscripcion.fechaFinal.toDate().toLocaleDateString('es-MX');
            //guardar elemento en array y contar
            inscripciones.push(inscripcionDetalle);
            contador++;
            //cuando se guardaron todos los elementos, hacer next
            if (contador == cantidadProcesar) {
              observer.next(inscripciones);
            }
          });
          //final de iteracion
        }
        //se proceso el for, fin de subscribe
      });
    })
  }

}
