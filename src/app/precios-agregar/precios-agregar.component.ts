import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {PreciosService} from "../services/precios.service";
import {NgxSpinnerService} from "ngx-spinner";
import {NotificationService} from "../services/notification.service";
import {TranslateService} from "@ngx-translate/core";

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
  stringRegEx = /^[a-zA-Z0-9\sñ]+$/;

  @Input() precioId: string;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  opcionesTipoDuracion: any[] = [];

  constructor(private formBuilder: FormBuilder,
              private preciosService: PreciosService,
              private spinner: NgxSpinnerService,
              private notificationService: NotificationService,
              private translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.iniciarForm()
  }

  iniciarForm() {
    /**
     * Reactive form
     */
    this.form = this.formBuilder.group(
      {
        nombre: ['', [Validators.required, Validators.pattern(this.stringRegEx)]],
        duracion: ['', [Validators.required, Validators.pattern(this.numberRegEx)]],
        tipoDuracion: ['', [Validators.required]],
        costo: ['', [Validators.required, Validators.pattern(this.numberRegEx)]],
      },
    );
    // texto de tipo de duracion
      let value =  this.translate.instant('models.durationType')
      for (let key in value) {
        this.opcionesTipoDuracion.push({"title": value[key].title, "value": value[key].value})
      }
  }

  //es editar
  ngOnChanges(changes: SimpleChanges) {
    /**
     * Escuchar cambios en precioId, el primer cambio es al iniciar al componente,
     * el sgte cambio significa que el usuario quiere editar y envio un precioId desde el PreciosDashboard
     */
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
    /**
     * Guardar datos
     */
    if (this.form.valid) {
      this.spinner.show();
      this.preciosService.create(this.form.value).then(() => {
        // reset form
        this.formGroupDirective.resetForm();
        this.spinner.hide();
        this.notificationService.exitoToast(this.translate.instant('prices.add.addNotifications.success'));
      }).catch(error => {
        console.log(error);
        this.spinner.hide();
        this.notificationService.errorToast(this.translate.instant('prices.add.addNotifications.error'))
      })
    }else {
      console.log('form guardar invalido')
    }
  }

  onEdit() {
    /**
     * Editar datos
     */
    if (this.form.valid) {
      this.spinner.show();
      this.preciosService.update(this.precioId, this.form.value).then(() => {
        this.spinner.hide();
        this.notificationService.exitoToast(this.translate.instant('prices.add.editNotifications.success'))
      }).catch(error => {
        console.log(error);
        this.spinner.hide();
        this.notificationService.errorToast(this.translate.instant('prices.add.editNotifications.error'))
      })
    } else {
      console.log('form editar invalido')
    }
  }

}
