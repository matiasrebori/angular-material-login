import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {PreciosModalComponent} from "../precios-modal/precios-modal.component";

@Component({
  selector: 'app-precios-dashboard',
  templateUrl: './precios-dashboard.component.html',
  styleUrls: ['./precios-dashboard.component.css']
})
export class PreciosDashboardComponent implements OnInit {
  precioId:string;

  constructor(private dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  mostrarModal(id:string){
    this.openDialog(id);
  }

  openDialog(id:string) {
    const dialogRef = this.dialog.open(PreciosModalComponent, {
      data: { id:id },
      // height: '400px',
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(res =>{
      console.log(res);
      if(res.accion == 'editar'){
        this.precioId = res.id;
      }
    })

  }

  editar(id:string){
    return id;
  }

}
