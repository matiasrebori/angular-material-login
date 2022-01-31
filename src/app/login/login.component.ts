import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../services/auth.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /* AQUI DEFINIMOS LA TEMATICA DE NUESTRA IMAGEN*/
  styleImage = 'gym';
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public authService: AuthService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): any {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /* ESTA FUNCION ES ACTIVADA POR EL NGSTYLE */
  unsplashClass(): any {
    return {
      'min-height': '100%',
      /* LLAMADA RANDOMICA AL SERVICIO DE IMAGENES DE UNSPLASH - CON IMAGENES DE TAMAÑO 1200X900 */
      /*SE LE AÑADE LA VARIABLE DE styleUrls PARA ESTABLECER LA TEMATICA*/
      background: `url("https://source.unsplash.com/random/1200x900?"${this.styleImage}) no-repeat center center`,
      'background-size': 'cover',
      position: 'relative',
    };
  }

  login(event: Event): any {
    event.preventDefault();
    if (this.form.valid) {
      //mostrar spinner
      this.spinner.show()
      const value = this.form.value;
      this.authService.login(value.email, value.password).subscribe(autenticado => {
        if (autenticado) {
          this.spinner.hide();
          this.router.navigateByUrl('dashboard')
        } else {
          this.spinner.hide();
          //mensaje de error
          this.openSnackBar()
        }
      })
    } else {
      console.log('formulario no valido');
    }
  }

  openSnackBar() {
    this._snackBar.open('Datos incorrectos', '', {duration: 2000})
  }

}
