import {Component, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Cliente} from "../models";
import { Observable } from 'rxjs';
import {ClientesService} from "../services/clientes.service";

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
  items: Observable<any[]>;
  cliente: Cliente;
  clientesListado: Cliente[] = new Array<Cliente>();
  arr: any[] = new Array<any>();

  @Output() enviarclienteID: EventEmitter<string> = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private clientesService: ClientesService,) {
  }

  ngOnInit(): void {
    // this.items = this.clientesService.getAllNaive();
    this.items = this.clientesService.getAll();
    this.items.subscribe(res => {
      res.map((value) => {
        value.fechaNacimiento = value.fechaNacimiento.toDate().toLocaleDateString("es-MX");
      });
      this.clientesListado = res;
      this.dataSource = new MatTableDataSource(this.clientesListado);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //enviar a editar
  emitirEvento(row:Cliente){
    this.enviarclienteID.emit(row.id)
  }

}

const ELEMENT_DATA: Cliente[] = [
  {id: '1', nombre: 'Miguel Angel ', apellido: 'Rodriguez Armoa', correo: 'marmoa@gmail.com', fechaNacimiento: new Date(''), telefono: '0981425154', cedula: '5456874', visible: true },
];


