import {Component, OnInit} from '@angular/core';
import {DeviceService} from "./services/device.service";
import {AuthService} from "./services/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  menuParaTelefono: boolean = false;
  autenticado: boolean = false;

  constructor(private deviceService: DeviceService, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.deviceService.esTelefono().subscribe(value => {
      this.menuParaTelefono = value;
    });
    this.auth.isLogged().subscribe(value => {
      this.autenticado = value;
    }, error => {
      console.log(error);
    });
  }
}
