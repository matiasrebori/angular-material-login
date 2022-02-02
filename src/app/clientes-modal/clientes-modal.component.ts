import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-clientes-modal',
  templateUrl: './clientes-modal.component.html',
  styleUrls: ['./clientes-modal.component.css']
})
export class ClientesModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: string}, private dialogRef: MatDialogRef<ClientesModalComponent>) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.dialogRef.close()
  }

}
