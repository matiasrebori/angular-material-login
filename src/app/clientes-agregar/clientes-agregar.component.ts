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

  constructor(private formBuilder: FormBuilder, private _snackBar: MatSnackBar, private clienteService: ClientesService) {
  }

  ngOnInit(): void {
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

  onSubmit(): void {
    if (this.form.valid) {
      this.clienteService.create(this.form.value).then(r => {
        console.log(r);
        //reset form
        this.formGroupDirective.resetForm();
        //notificacion
        this.openSnackBar()
      })
    }
  }

  openSnackBar() {
    this._snackBar.open('Cliente Guardado!', '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000,
    });
  }


}
