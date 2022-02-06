import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from "@angular/fire/compat/firestore";
import {Inscripcion} from "../models";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {
  private dbPath = 'inscripciones';
  inscripcionCollection: AngularFirestoreCollection<Inscripcion>;
  private itemDoc: AngularFirestoreDocument<Inscripcion>;
  item: Observable<Inscripcion>;

  constructor(private afs: AngularFirestore) {
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
