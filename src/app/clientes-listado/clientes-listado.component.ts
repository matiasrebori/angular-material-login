import {Component, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Cliente} from "../models";
import {Observable} from 'rxjs';
import {ClientesService} from "../services/clientes.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-clientes-listado',
  templateUrl: './clientes-listado.component.html',
  styleUrls: ['./clientes-listado.component.css']
})
export class ClientesListadoComponent implements OnInit {
  // displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'fechaNacimiento', 'telefono', 'cedula'];
  displayedColumns: string[] = ['nombre', 'apellido', 'telefono', 'cedula'];
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
  clientesListado: Cliente[] = new Array<Cliente>();
  isLoadingResults: boolean;

  @Output() enviarclienteID: EventEmitter<string> = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private clientesService: ClientesService, private translate: TranslateService) {
  }

  ngOnInit(): void {
    //mostrar spinner
    this.isLoadingResults = true;
    this.traducirHeadersTabla();
    this.items = this.clientesService.getAll();
    this.items.subscribe(res => {
      res.map((value) => {
        if (value.fechaNacimiento) {
          value.fechaNacimiento = value.fechaNacimiento.toDate().toLocaleDateString("es-MX");
        }
      });
      this.clientesListado = res;
      this.dataSource = new MatTableDataSource(this.clientesListado);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      //ocultar spinner
      this.isLoadingResults = false;
    })
  }

  traducirHeadersTabla() {
    /**
     * traducir los headers de la tabla segun el idioma
     */
    let headers = this.translate.instant('clients.list.table')
    this.columns.map(value => {
      if (value.columnDef == 'nombre') {
        value.header = headers.firstName
      } else if (value.columnDef == 'apellido') {
        value.header = headers.lastName
      } else if (value.columnDef == 'correo') {
        value.header = headers.email
      } else if (value.columnDef == 'fechaNacimiento') {
        value.header = headers.birthday
      } else if (value.columnDef == 'telefono') {
        value.header = headers.phoneNumber
      } else if (value.columnDef == 'cedula') {
        value.header = headers.identityNumber
      }
    })
  }

  applyFilter(event: Event) {
    /**
     * filtro de la tabla
     */
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  emitirEvento(row: Cliente) {
    /**
     * emitir el id al componente ClientesDashboard
     */
    this.enviarclienteID.emit(row.id)
  }

}


