import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from "@angular/router"
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  autenticado = of(false);

  constructor(public auth: AngularFireAuth, public router: Router) {
  }


  login(email: string, password: string): Observable<any> {
    return new Observable<any>((observer) => {

      this.auth.signInWithEmailAndPassword(email, password).then(() => {
        observer.next(true);
      }).catch(error => {
        console.log(error)
        observer.next(false);
      })

    });

  }

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigateByUrl('login')
    })
  }

}
