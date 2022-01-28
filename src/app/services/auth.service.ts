import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {Router} from "@angular/router"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth, public  router: Router) { }

  login(email:string, password:string){
    this.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigateByUrl('dashboard')
    } )
  }

  logout(){
    this.auth.signOut().then(() => {
      this.router.navigateByUrl('login')
    })
  }

}
