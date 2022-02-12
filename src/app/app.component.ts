import {Component, OnInit} from '@angular/core';
import {DeviceService} from "./services/device.service";
import {AuthService} from "./services/auth.service";
import { TranslateService } from '@ngx-translate/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  menuParaTelefono: boolean = false;
  autenticado: boolean = false;

  constructor(private deviceService: DeviceService,
              private auth: AuthService,
              private translate: TranslateService) {
    // agregar idiomas y setear el idioma por defecto
    translate.addLangs(['es', 'en']);
    translate.setDefaultLang('es');
    translate.use('es');
  }

  ngOnInit(): void {
    this.deviceService.esTelefono().subscribe(value => {
      this.menuParaTelefono = value;
    });
    // this.auth.isLogged().subscribe(value => {
    //   console.log(value)
    //   // if (!value){
    //   //   this.router.navigateByUrl('login');
    //   // }
    //   this.autenticado = value;
    //   console.log(value)
    // }, error => {
    //   console.log(error);
    // });
    this.autenticado = true;
  }
}
