import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from './material/material.module';
import { LoginComponent } from './login/login.component'
/* firebase */
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
/* animations */
import {NgxSpinnerModule} from "ngx-spinner";
import { ClientesListadoComponent } from './clientes-listado/clientes-listado.component';
import { ClientesAgregarComponent } from './clientes-agregar/clientes-agregar.component';
import {MAT_DATE_LOCALE} from "@angular/material/core";
import { ClientesDashboardComponent } from './clientes-dashboard/clientes-dashboard.component';
import { ClientesModalComponent } from './clientes-modal/clientes-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MenuComponent,
    ClientesListadoComponent,
    ClientesAgregarComponent,
    ClientesDashboardComponent,
    ClientesModalComponent
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
    NgxSpinnerModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-mx'},
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
