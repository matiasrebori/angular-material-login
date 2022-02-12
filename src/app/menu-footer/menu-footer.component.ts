import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-menu-footer',
  templateUrl: './menu-footer.component.html',
  styleUrls: ['./menu-footer.component.css']
})
export class MenuFooterComponent implements OnInit {
  constructor(private translate: TranslateService, private notification:NotificationService) {
  }

  ngOnInit(): void {
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
