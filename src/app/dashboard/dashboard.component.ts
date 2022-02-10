import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {InscripcionDetalle} from "../models";
import {InscripcionesService} from "../services/inscripciones.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'fechaInicial', 'fechaFinal', 'tipoDuracion', 'costo'];
  columns = [
    {
      columnDef: 'nombre',
      header: 'Nombre',
      cell: (element: InscripcionDetalle) => `${element.clienteNombre}`,
    },
    {
      columnDef: 'apellido',
      header: 'Apellido',
      cell: (element: InscripcionDetalle) => `${element.clienteApellido}`,
    },
    {
      columnDef: 'fechaInicial',
      header: 'Fecha Inicial',
      cell: (element: InscripcionDetalle) => `${element.fechaInicial}`,
    },
    {
      columnDef: 'fechaFinal',
      header: 'Fecha Final',
      cell: (element: InscripcionDetalle) => `${element.fechaFinal}`,
    },
    {
      columnDef: 'tipoDuracion',
      header: 'Tipo de Duracion',
      cell: (element: InscripcionDetalle) => `${element.tipoDuracion}`,
    },
    {
      columnDef: 'costo',
      header: 'Total',
      cell: (element: InscripcionDetalle) => `${element.total}`,
    },
  ];
  dataSource: MatTableDataSource<InscripcionDetalle>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isLoadingResults: boolean = false;
  contador: number = 0;

  inscripciones: InscripcionDetalle[] = [];
  myArray: any[] = []
  constructor(private inscripcionesService: InscripcionesService,
  ) {
  }

  ngOnInit(): void {
    this.getInscripcionesDetalle();
  }


  getInscripcionesDetalle() {
    /**
     * Traer los datos de las inscripciones con datos del cliente y precio
     */
    //mostrar spinner
    this.isLoadingResults = true;
    this.inscripcionesService.getAllReferenced().subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      //ocultar spinner
      this.isLoadingResults = false;
    });
  }

  //filtro de tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //enviar a editar
  emitirEvento(row: InscripcionDetalle) {
    console.log(row);
  }




}

