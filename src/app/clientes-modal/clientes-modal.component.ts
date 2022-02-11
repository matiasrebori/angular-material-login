import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from "../services/notification.service";
import {ClientesService} from "../services/clientes.service";

@Component({
  selector: 'app-clientes-modal',
  templateUrl: './clientes-modal.component.html',
  styleUrls: ['./clientes-modal.component.css']
})
export class ClientesModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: string },
              private dialogRef: MatDialogRef<ClientesModalComponent>,
              private notification: NotificationService,
              private clienteService: ClientesService) {
  }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.dialogRef.close()
  }

  abrir() {

  }

  confirmarEliminar() {
    let msg = "estas seguro de que deseas eliminar?"
    let confirm = "Eliminar"
    let decline = "Cancelar"
    this.notification.confirmDelete(msg, confirm, decline).subscribe((success) => {
      if (success) {
        this.clienteService.delete(this.data.id).then(() => {
          this.dialogRef.close();
          this.notification.exitoToast('Cliente Eliminado!');
        })
      } else {
        this.dialogRef.close();
      }
    })
  }

}
