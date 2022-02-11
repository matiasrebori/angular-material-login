import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../services/notification.service";
import {PreciosService} from "../services/precios.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-precios-modal',
  templateUrl: './precios-modal.component.html',
  styleUrls: ['./precios-modal.component.css']
})
export class PreciosModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: string},
              private dialogRef: MatDialogRef<PreciosModalComponent>,
              private notification: NotificationService,
              private preciosService: PreciosService,
              private translate: TranslateService) { }

  ngOnInit(): void {
  }

  emitirEditar(){
    /**
     * Emitir accion editar al modal en PreciosDashboard, enviar el id del precio
     */
    this.dialogRef.close({accion: 'editar', id:this.data.id});
  }

  eliminar(){
    /**
     * Mostrar modal de confirmacion y eliminar o cerrar el modal
     */
    let msg = this.translate.instant('prices.modal.deleteNotification')
    this.notification.confirmDelete(msg.message, msg.confirm, msg.decline).subscribe((success) => {
      if(success){
        this.preciosService.delete(this.data.id).then(()=>{
          this.dialogRef.close({accion: 'eliminar'});
          this.notification.exitoToast(this.translate.instant('prices.modal.deleteSuccess'));
        })
      }else{
        this.dialogRef.close({accion: 'cancelar eliminar'});
      }
    })
  }
}
