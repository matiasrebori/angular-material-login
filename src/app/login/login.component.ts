import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../services/auth.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  imagenRuta:string
  form: FormGroup;
  constructor(private formBuilder: FormBuilder,
              public authService: AuthService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private _snackBar: MatSnackBar,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.imagenRuta = this.elegirImagenRandom();
  }

  private buildForm(): any {
    /**
     * formulario
     */
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  /* ESTA FUNCION ES ACTIVADA POR EL NGSTYLE */
  mostrarImagen(): any {
    /**
     * setear imagen con background a traves del ngstyle
     */
    return {
      // 'min-height': '100%',
      // // /* LLAMADA RANDOMICA AL SERVICIO DE IMAGENES DE UNSPLASH - CON IMAGENES DE TAMAÑO 1200X900 */
      // // /*SE LE AÑADE LA VARIABLE DE styleUrls PARA ESTABLECER LA TEMATICA*/
      // background: `url("https://source.unsplash.com/random/1200x900?"gym) no-repeat center center`,
      // 'background-size': 'cover',
      // position: 'relative',
    'background-image': `url("${this.imagenRuta}")`,
    'background-size': 'cover',
    'position': 'relative',
    'background-position': 'center',
    'background-repeat': 'no-repeat',
    };
  }

  login(event: Event): any {
    /**
     * iniciar sesion
     */
    event.preventDefault();
    if (this.form.valid) {
      //mostrar spinner
      this.spinner.show()
      const value = this.form.value;
      this.authService.login(value.email, value.password).subscribe(autenticado => {
        if (autenticado) {
          this.spinner.hide();
          this.router.navigateByUrl('dashboard');
        }
      }, errorMsg => {
        this.spinner.hide();
         this.notificationService.errorToast(errorMsg);
      })
    } else {
      console.log('formulario no valido');
    }
  }

  elegirImagenRandom():string {
    /**
     * elegir una imagen random y retornar ruta en string
     */
    let myPix = ["assets/img/logo-gym-0.jpg", "assets/img/logo-gym-1.jpg",
      "assets/img/logo-gym-2.jpg", "assets/img/logo-gym-3.jpg",
      "assets/img/logo-gym-4.jpg","assets/img/logo-gym-5.jpg",
      "assets/img/logo-gym-6.jpg",];
    let randomNum = Math.floor(Math.random() * myPix.length);
    return myPix[randomNum];
  }

}
