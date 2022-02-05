import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {PreciosService} from "../services/precios.service";
import {NgxSpinnerService} from "ngx-spinner";
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-precios-agregar',
  templateUrl: './precios-agregar.component.html',
  styleUrls: ['./precios-agregar.component.css']
})
export class PreciosAgregarComponent implements OnInit {
  form: FormGroup;
  esEditar: boolean = false;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(private formBuilder: FormBuilder,
              private preciosService: PreciosService,
              private spinner: NgxSpinnerService,
              private notificationService: NotificationService
              ) { }

  ngOnInit(): void {
    this.iniciarForm()
  }

  iniciarForm(){
    this.form = this.formBuilder.group(
      {
        nombre: ['', Validators.required],
        duracion: ['', Validators.required],
        tipoDuracion: ['', Validators.required],
        costo: ['', Validators.required],
      },
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.spinner.show();
      this.preciosService.create(this.form.value).then(() => {
        //reset form
        this.formGroupDirective.resetForm();
        this.spinner.hide();
        //notificacion
        this.notificationService.exitoToast('Cliente Guardado!')
      })
    }
  }

  onEdit(){

  }

}
