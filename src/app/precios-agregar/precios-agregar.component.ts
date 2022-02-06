import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
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
  // que comienze con 1-9 y dps cualquier numero
  numberRegEx = /^[1-9]\d*$/;
  // letra, numero, espacio
  stringRegEx = /^[a-zA-Z0-9\s]+$/;

  @Input() precioId: string;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(private formBuilder: FormBuilder,
              private preciosService: PreciosService,
              private spinner: NgxSpinnerService,
              private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.iniciarForm()
  }

  iniciarForm() {
    this.form = this.formBuilder.group(
      {
        nombre: ['', [Validators.required, Validators.pattern(this.stringRegEx)]],
        duracion: ['', [Validators.required, Validators.pattern(this.numberRegEx)]],
        tipoDuracion: ['', [Validators.required, Validators.pattern(this.numberRegEx)]],
        costo: ['', [Validators.required, Validators.pattern(this.numberRegEx)]],
      },
    );
  }

  //es editar
  ngOnChanges(changes: SimpleChanges) {
    if (!changes['precioId'].firstChange) {
      this.esEditar = true;
      //traer el cliente y poner datos en form
      this.preciosService.get(this.precioId).subscribe((precio) => {
        this.form.setValue(
          {
            nombre: precio.nombre,
            duracion: precio.duracion,
            tipoDuracion: precio.tipoDuracion,
            costo: precio.costo,
          })
      });
    }
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

  onEdit() {
    if (this.form.valid) {
      this.spinner.show();
      this.preciosService.update(this.precioId, this.form.value).then(() => {
        this.spinner.hide();
        this.notificationService.exitoToast('Cliente Actualizado!')
      })
    } else {
      console.log('form invalido')
    }
  }

}
