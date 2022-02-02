import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Cliente} from "../models";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat";
import DocumentReference = firebase.firestore.DocumentReference;
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private dbPath = 'clientes';
  clientesCollection: AngularFirestoreCollection<Cliente>;
  private itemDoc: AngularFirestoreDocument<Cliente>;
  item: Observable<Cliente>;

  constructor(private afs: AngularFirestore) {
    this.clientesCollection = afs.collection<Cliente>(this.dbPath);
  }

  //traer los datos sin metadata, id
  getAllNaive(): Observable<Cliente[]> {
    return this.clientesCollection.valueChanges();
  }

  getAll(): Observable<Cliente[]> {
    return this.clientesCollection.snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as Cliente;
       data.id = a.payload.doc.id;
       return data
     }))
   );
  }

  get(id: string): Observable<any>{
    this.itemDoc = this.afs.doc<Cliente>(`${this.dbPath}/${id}`);
    return this.itemDoc.valueChanges();
    // return this.clientesCollection.doc(`${this.dbPath}/${id}`).valueChanges();
  }

  create(cliente: Cliente): Promise<DocumentReference<Cliente>> {
    return this.clientesCollection.add(cliente);
  }

  update(id: string, data: Cliente): Promise<void>{
    return this.clientesCollection.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.clientesCollection.doc(id).delete();
  }

  // public crear(cliente:any): Observable<any> {
  //   return new Observable<any>((observer) => {
  //     this.afs.collection<Cliente>('clientes').add(cliente).then((documentRef) => {
  //       observer.next(documentRef);
  //     }).catch(error => {
  //       observer.next(error);
  //     })
  //   });
  // }

}
