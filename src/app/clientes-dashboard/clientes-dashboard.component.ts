import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from '@angular/material/dialog';
import {ClientesModalComponent} from "../clientes-modal/clientes-modal.component";

@Component({
  selector: 'app-clientes-dashboard',
  templateUrl: './clientes-dashboard.component.html',
  styleUrls: ['./clientes-dashboard.component.css']
})
export class ClientesDashboardComponent implements OnInit {

  constructor(private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  mostrarModal(id:string){
    console.log(id)
    // this.router.navigateByUrl(`/clientes-agregar/${id}`)
    this.openDialog(id)
  }

  openDialog(id:string) {
    const dialogRef = this.dialog.open(ClientesModalComponent, {
      data: { id:id },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
