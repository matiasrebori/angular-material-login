import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from "@angular/fire/compat/firestore";
import {Precios} from "../models";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PreciosService {
  private dbPath = 'precios';
  preciosCollection: AngularFirestoreCollection<Precios>;
  private itemDoc: AngularFirestoreDocument<Precios>;
  item: Observable<Precios>;

  constructor(private afs: AngularFirestore) {
    this.preciosCollection = afs.collection<Precios>(this.dbPath);
  }

  //traer los datos sin metadata, id
  getAllNaive(): Observable<Precios[]> {
    return this.preciosCollection.valueChanges();
  }

  getAll(): Observable<Precios[]> {
    return this.preciosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Precios;
        data.id = a.payload.doc.id;
        return data
      }))
    );
  }

  get(id: string): Observable<any>{
    this.itemDoc = this.afs.doc<Precios>(`${this.dbPath}/${id}`);
    return this.itemDoc.valueChanges();
  }

  getRef(id:string): DocumentReference{
    return this.afs.doc<Precios>(`${this.dbPath}/${id}`).ref;
  }

  create(precio: Precios): Promise<DocumentReference<Precios>> {
    return this.preciosCollection.add(precio);
  }

  update(id: string, data: Precios): Promise<void>{
    return this.preciosCollection.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.preciosCollection.doc(id).delete();
  }
}
