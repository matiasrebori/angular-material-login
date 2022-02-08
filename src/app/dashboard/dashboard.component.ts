import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {InscripcionDetalle, Precios} from "../models";
import {InscripcionesService} from "../services/inscripciones.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {zip} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'fechaInicial', 'fechaFinal'];
  columns = [
    {
      columnDef: 'nombre',
      header: 'Nombre',
      cell: (element: Precios) => `${element.nombre}`,
    },
    {
      columnDef: 'duracion',
      header: 'Duracion',
      cell: (element: Precios) => `${element.duracion}`,
    },
    {
      columnDef: 'tipoDuracion',
      header: 'Tipo de Duracion',
      cell: (element: Precios) => `${element.tipoDuracion}`,
    },
    {
      columnDef: 'costo',
      header: 'Costo',
      cell: (element: Precios) => `${element.costo}`,
    },
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  inscripciones: InscripcionDetalle[] = [];

  constructor(private inscripcionesService: InscripcionesService,
              private afs: AngularFirestore,
  ) {
  }

  ngOnInit(): void {
    this.getInscripcionesDetalle();
    console.log(this.inscripciones);
  }


  getInscripcionesDetalle() {
    /**
     * Traer los datos de las inscripciones con datos del cliente y precio
     */
    let inscripcionDetalle: InscripcionDetalle;
    this.inscripciones.length = 0;
    this.afs.collection<any>('inscripciones').valueChanges().subscribe(array => {
      //por cada inscripcion traer los datos del cliente y precio
      for (let inscripcion of array) {
        //observable de cliente y precio
        let clienteObservable = this.afs.doc<any>(inscripcion.cliente.path).valueChanges();
        let precioObservable = this.afs.doc<any>(inscripcion.precio.path).valueChanges();
        //esperar por observables
        const observables = zip(
          clienteObservable,
          precioObservable,
        );
        //cuando los dos observables emitan
        observables.subscribe(val => {
          inscripcionDetalle = new InscripcionDetalle();
          inscripcionDetalle.clienteNombre = val[0].nombre;
          inscripcionDetalle.clienteApellido = val[0].apellido;
          inscripcionDetalle.tipoDuracion = val[1].tipoDuracion.toString();
          inscripcionDetalle.total = val[1].costo;
          inscripcionDetalle.fechaInicial = inscripcion.fechaInicial.toDate().toLocaleDateString('es-MX');
          inscripcionDetalle.fechaFinal = inscripcion.fechaFinal.toDate().toLocaleDateString('es-MX');
          this.inscripciones.push(inscripcionDetalle);
        });
      }
      //termino el for
    });
  }

  // fun() {
  //   /**
  //    * Traer los datos de las inscripciones con snapshotChanges
  //    */
  //   this.afs.collection<any>('inscripciones').snapshotChanges().pipe(
  //     map(actions => actions.map(a => {
  //       const data = a.payload.doc.data();
  //       data.id = a.payload.doc.id;
  //       return data
  //     }))
  //   ).subscribe(array => {
  //     let inscripcionDetalle: InscripcionDetalle;
  //     this.inscripciones.length = 0;
  //     for (let inscripcion of array) {
  //       let clienteObservable = this.afs.doc<any>(inscripcion.cliente.path).valueChanges();
  //       let precioObservable = this.afs.doc<any>(inscripcion.precio.path).valueChanges();
  //       const observables = zip(
  //         clienteObservable,
  //         precioObservable,
  //       );
  //       observables.subscribe(val => {
  //         inscripcionDetalle = new InscripcionDetalle();
  //         inscripcionDetalle.clienteNombre = val[0].nombre;
  //         inscripcionDetalle.clienteApellido = val[0].apellido;
  //         inscripcionDetalle.tipoDuracion = val[1].tipoDuracion.toString();
  //         inscripcionDetalle.total = val[1].costo;
  //         inscripcionDetalle.fechaInicial = inscripcion.fechaInicial.toDate().toLocaleDateString('es-MX');
  //         inscripcionDetalle.fechaFinal = inscripcion.fechaFinal.toDate().toLocaleDateString('es-MX');
  //         this.inscripciones.push(inscripcionDetalle);
  //       });
  //       console.log('sgte');
  //     }
  //
  //   });
  // }

}
