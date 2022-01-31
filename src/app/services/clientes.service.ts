import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Cliente} from "../models";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat";
import DocumentReference = firebase.firestore.DocumentReference;

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private dbPath = 'clientes';
  clientesCollection: AngularFirestoreCollection<Cliente>;

  constructor(private afs: AngularFirestore) {
    this.clientesCollection = afs.collection<Cliente>(this.dbPath);
  }

  //traer los datos sin metadata, id
  getAllNaive(): Observable<Cliente[]> {
    return this.clientesCollection.valueChanges();
  }

  create(cliente: Cliente): Promise<DocumentReference<Cliente>> {
    return this.clientesCollection.add(cliente);
  }

  update(id: string, data: any): Promise<void>{
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
