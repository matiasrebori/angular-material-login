import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../services/notification.service";
import {PreciosService} from "../services/precios.service";

@Component({
  selector: 'app-precios-modal',
  templateUrl: './precios-modal.component.html',
  styleUrls: ['./precios-modal.component.css']
})
export class PreciosModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: string},
              private dialogRef: MatDialogRef<PreciosModalComponent>,
              private notification: NotificationService,
              private preciosService: PreciosService,) { }

  ngOnInit(): void {
  }

  emitirEditar(){
    this.dialogRef.close({accion: 'editar', id:this.data.id});
  }

  eliminar(){
    this.notification.confirmDelete().subscribe((success) => {
      if(success){
        this.preciosService.delete(this.data.id).then(()=>{
          this.dialogRef.close({accion: 'eliminar'});
          this.notification.exitoToast('Precio Eliminado!');
        })
      }else{
        this.dialogRef.close({accion: 'cancelar eliminar'});
      }
    })
  }
}
