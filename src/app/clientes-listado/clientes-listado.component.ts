import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Cliente} from "../models";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clientes-listado',
  templateUrl: './clientes-listado.component.html',
  styleUrls: ['./clientes-listado.component.css']
})
export class ClientesListadoComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'fechaNacimiento', 'telefono', 'cedula', 'visible'];
  columns = [
    {
      columnDef: 'nombre',
      header: 'Nombre',
      cell: (element: Cliente) => `${element.nombre}`,
    },
    {
      columnDef: 'apellido',
      header: 'Apellido',
      cell: (element: Cliente) => `${element.apellido}`,
    },
    {
      columnDef: 'correo',
      header: 'Correo',
      cell: (element: Cliente) => `${element.correo}`,
    },
    {
      columnDef: 'fechaNacimiento',
      header: 'Fecha de Nacimiento',
      cell: (element: Cliente) => `${element.fechaNacimiento}`,
    },
    {
      columnDef: 'telefono',
      header: 'Telefono',
      cell: (element: Cliente) => `${element.telefono}`,
    },
    {
      columnDef: 'cedula',
      header: 'Cedula',
      cell: (element: Cliente) => `${element.cedula}`,
    },
    {
      columnDef: 'visible',
      header: 'Visible',
      cell: (element: Cliente) => `${element.visible}`,
    },
  ];
  dataSource: MatTableDataSource<Cliente>;
  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;
  clientesListado: Cliente[] = new Array<Cliente>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<any>('clientes');
    this.items = this.itemsCollection.valueChanges();
    this.items.subscribe(resultado => {
      resultado.forEach(item =>{
        item.fechaNacimiento = item.fechaNacimiento.toDate().toDateString();
        this.clientesListado.push(item)
      })
      console.log(this.clientesListado);
      this.dataSource = new MatTableDataSource(this.clientesListado);
    })

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  log(row:Cliente){
    console.log(row)
  }

}

const ELEMENT_DATA: Cliente[] = [
  {id: '1', nombre: 'Miguel Angel ', apellido: 'Rodriguez Armoa', correo: 'marmoa@gmail.com', fechaNacimiento: new Date(''), telefono: '0981425154', cedula: '5456874', visible: true },

];


