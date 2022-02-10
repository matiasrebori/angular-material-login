import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from './material/material.module';
/* firebase */
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
/* components */
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component'
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientesDashboardComponent } from './clientes-dashboard/clientes-dashboard.component';
import { ClientesModalComponent } from './clientes-modal/clientes-modal.component';
import { ClientesListadoComponent } from './clientes-listado/clientes-listado.component';
import { ClientesAgregarComponent } from './clientes-agregar/clientes-agregar.component';
/* animations */
import {NgxSpinnerModule} from "ngx-spinner";
import {MAT_DATE_LOCALE} from "@angular/material/core";
/* notifications */
import {NgxAwesomePopupModule, ConfirmBoxConfigModule, DialogConfigModule, ToastNotificationConfigModule} from "@costlydeveloper/ngx-awesome-popup";
import { HotToastModule } from '@ngneat/hot-toast';
import { PreciosDashboardComponent } from './precios-dashboard/precios-dashboard.component';
import { PreciosListadoComponent } from './precios-listado/precios-listado.component';
import { PreciosAgregarComponent } from './precios-agregar/precios-agregar.component';
import { PreciosModalComponent } from './precios-modal/precios-modal.component';
import { InscripcionesAgregarComponent } from './inscripciones-agregar/inscripciones-agregar.component';
import { MenuSidenavComponent } from './menu-sidenav/menu-sidenav.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MenuComponent,
    ClientesListadoComponent,
    ClientesAgregarComponent,
    ClientesDashboardComponent,
    ClientesModalComponent,
    PreciosDashboardComponent,
    PreciosListadoComponent,
    PreciosAgregarComponent,
    PreciosModalComponent,
    InscripcionesAgregarComponent,
    MenuSidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxSpinnerModule,
    NgxAwesomePopupModule.forRoot({
      colorList:{
        customOne: '#3ebb1a'
      }
    }),
    ConfirmBoxConfigModule.forRoot(),
    DialogConfigModule.forRoot(),
    ToastNotificationConfigModule.forRoot(),
    HotToastModule.forRoot(),
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-mx'},
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
