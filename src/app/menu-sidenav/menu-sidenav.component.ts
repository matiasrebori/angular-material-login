import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {TranslateService} from "@ngx-translate/core";
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-menu-sidenav',
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.css']
})
export class MenuSidenavComponent implements OnInit {

  constructor(private authService: AuthService, private translate: TranslateService, private notification: NotificationService) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout()
  }

  setLanguageEnglish() {
    this.translate.use('en');
    this.notification.exitoToast(this.translate.instant('changeLanguage'))
  }

  setLanguageSpanish() {
    this.translate.use('es');
    this.notification.exitoToast(this.translate.instant('changeLanguage'))
  }

  setLanguagePortuguese() {
    this.translate.use('br');
    this.notification.exitoToast(this.translate.instant('changeLanguage'))
  }


}
