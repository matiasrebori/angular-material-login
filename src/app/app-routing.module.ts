import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AngularFireAuthGuard} from '@angular/fire/compat/auth-guard';
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ClientesAgregarComponent} from "./clientes-agregar/clientes-agregar.component";
import {ClientesDashboardComponent} from "./clientes-dashboard/clientes-dashboard.component";
import {PreciosDashboardComponent} from "./precios-dashboard/precios-dashboard.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'clientes-dashboard', component: ClientesDashboardComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'clientes-agregar', component: ClientesAgregarComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'clientes-agregar/:clienteID', component: ClientesAgregarComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'precios-dashboard', component: PreciosDashboardComponent, canActivate: [AngularFireAuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
