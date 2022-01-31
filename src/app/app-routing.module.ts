import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ClientesListadoComponent} from "./clientes-listado/clientes-listado.component";
import {ClientesAgregarComponent} from "./clientes-agregar/clientes-agregar.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'clientes-listado', component: ClientesListadoComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'clientes-agregar', component: ClientesAgregarComponent, canActivate: [AngularFireAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
