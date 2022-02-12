import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Cliente, Precios} from "../models";
import {PreciosService} from "../services/precios.service";
import {TranslateService} from "@ngx-translate/core";
import {MatSort, MatSortable} from "@angular/material/sort";

@Component({
  selector: 'app-precios-listado',
  templateUrl: './precios-listado.component.html',
  styleUrls: ['./precios-listado.component.css']
})
export class PreciosListadoComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'duracion', 'tipoDuracion', 'costo'];
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
  dataSource: MatTableDataSource<any>;
  listado: any[] = [];
  isLoadingResults: boolean;
  tableHeaders: any;

  @Output() enviarprecioID: EventEmitter<string> = new EventEmitter();
  @ViewChild(MatSort) sort: MatSort;

  constructor(private preciosService: PreciosService, private translate: TranslateService) {
  }

  ngOnInit(): void {
    /**
     * Cargar la tabla de precios
     */
    this.isLoadingResults = true;
    this.traducirHeadersTabla();
    //traer precios
    this.preciosService.getAll().subscribe(res => {
      this.listado = res;
      // reemplazar el tipo por texto traducido
      let tipoDuracion = this.translate.instant('models.durationType')
      this.listado.map(value => {
        if (value.tipoDuracion == 1) {
          value.tipoDuracion = tipoDuracion.day.title
        } else if (value.tipoDuracion == 2) {
          value.tipoDuracion = tipoDuracion.week.title
        } else if (value.tipoDuracion == 3) {
          value.tipoDuracion = tipoDuracion.month.title
        } else if (value.tipoDuracion == 4) {
          value.tipoDuracion = tipoDuracion.year.title
        }
      })
      this.dataSource = new MatTableDataSource(this.listado);
      //ordenar por precio
      this.sort.sort({id: 'costo', start: 'asc', disableClear: true} as MatSortable);
      this.dataSource.sort = this.sort;
      this.isLoadingResults = false;
    })

  }

  traducirHeadersTabla(){
    /**
     * traducir los headers de la tabla segun el idioma
     */
    let headers = this.translate.instant('prices.table')
    this.columns.map(value => {
      if(value.columnDef == 'nombre'){
        value.header = headers.name
      } else if(value.columnDef == 'duracion'){
        value.header = headers.duration
      }else if(value.columnDef == 'tipoDuracion'){
        value.header = headers.durationType
      }else if(value.columnDef == 'costo'){
        value.header = headers.cost
      }
    })
  }

  emitirEvento(row: Cliente) {
    /**
     * enviar id a componenete padre PreciosDashboard
     */
    this.enviarprecioID.emit(row.id)
  }

}
