import {Component, OnInit, ViewChild} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormGroupDirective
} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ClientesService} from "../services/clientes.service";
import {ActivatedRoute} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-clientes-agregar',
  templateUrl: './clientes-agregar.component.html',
  styleUrls: ['./clientes-agregar.component.css']
})
export class ClientesAgregarComponent implements OnInit {
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  // form: FormGroup;
  form: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    correo: new FormControl(''),
    fechaNacimiento: new FormControl(''),
    telefono: new FormControl(''),
    cedula: new FormControl(''),
  });
  esEditar: boolean = false;
  id: string;

  constructor(private formBuilder: FormBuilder,
              private _snackBar: MatSnackBar,
              private clienteService: ClientesService,
              private activeRoute: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    // iniciar form
    this.iniciarForm()
    //si existe id significa que se va a editar el cliente
    this.id = this.activeRoute.snapshot.params['clienteID'];
    if (this.id != undefined) {
      this.editar()
    }

  }

  iniciarForm(){
    this.form = this.formBuilder.group(
      {
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        fechaNacimiento: ['', Validators.required],
        telefono: ['', Validators.required],
        cedula: ['', Validators.required],
      },
    );
  }

  editar(){
    /**
     * cambiar html con variable esEditar, y setear el form para editar
     */
    this.esEditar = true;
    //traer el cliente y poner datos en form
    this.clienteService.get(this.id).subscribe((cliente) => {
      this.form.setValue(
        {
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          correo: cliente.correo,
          fechaNacimiento: new Date(cliente.fechaNacimiento.toDate()),
          telefono: cliente.telefono,
          cedula: cliente.cedula,
        })
    });
  }

  onSubmit(): void {
    /**
     * Guardar datos
     */
    if (this.form.valid) {
      this.spinner.show();
      this.clienteService.create(this.form.value).then(() => {
        //reset form
        this.formGroupDirective.resetForm();
        this.spinner.hide();
        //notificacion
        this.notificationService.exitoToast('Cliente Guardado!');
      })
    }else {
      console.log('guardar form invalido')
    }
  }

  onEdit(): void {
    /**
     * Editar datos
     */
    if (this.form.valid) {
      this.spinner.show();
      this.clienteService.update(this.id, this.form.value).then(() => {
        this.spinner.hide();
        this.notificationService.exitoToast('Cliente Actualizado!');
        })
    } else {
      console.log('editar form invalido')
    }
  }



}
