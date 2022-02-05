import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Cliente, Precios} from "../models";
import {Observable} from "rxjs";
import {PreciosService} from "../services/precios.service";

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
  dataSource: MatTableDataSource<Precios>;
  items: Observable<any[]>;
  preciosListado: Precios[] = new Array<Precios>();
  isLoadingResults: boolean;

  @Output() enviarprecioID: EventEmitter<string> = new EventEmitter();

  constructor(private preciosService: PreciosService) { }

  ngOnInit(): void {
    this.isLoadingResults = true;
    this.items = this.preciosService.getAll();
    this.items.subscribe(res => {
      this.preciosListado = res;
      this.dataSource = new MatTableDataSource(this.preciosListado);
      //ocultar spinner
      this.isLoadingResults = false;
    })
  }

  emitirEvento(row: Cliente) {
    this.enviarprecioID.emit(row.id)
  }

}


const ELEMENT_DATA: Precios[] = [
  {
    id: '1',
    nombre: 'por Dia',
    duracion: 1,
    tipoDuracion: 1,
    costo: 12000,
  },
];
