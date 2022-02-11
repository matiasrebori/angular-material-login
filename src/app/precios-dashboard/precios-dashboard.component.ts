import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {PreciosModalComponent} from "../precios-modal/precios-modal.component";

@Component({
  selector: 'app-precios-dashboard',
  templateUrl: './precios-dashboard.component.html',
  styleUrls: ['./precios-dashboard.component.css']
})
export class PreciosDashboardComponent implements OnInit {
  precioId: string;

  constructor(private dialog: MatDialog,) {
  }

  ngOnInit(): void {
  }

  mostrarModal(id: string) {
    /**
     * se recibe id de PreciosListadoComponent a traves de un output y se abre un modal
     */
    const dialogRef = this.dialog.open(PreciosModalComponent, {
      data: {id: id},
      // height: '400px',
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      /**
       * si se envio la accion editar guardamos el precioId, se envia al PreciosAgregarComponent a traves de un input,
       * el componente realiza una accion cuando escucha cambios en precioId, ngOnChanges
       */
      if (res.accion == 'editar') {
        this.precioId = res.id;
      }
    })
  }
}


