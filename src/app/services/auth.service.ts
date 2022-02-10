import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  autenticado: boolean = false;

  constructor(public auth: AngularFireAuth) {
  }


  login(email: string, password: string): Observable<boolean> {
    /**
     * Iniciar Sesion
     */
    return new Observable<boolean>((observer) => {
      this.auth.signInWithEmailAndPassword(email, password).then((user) => {
        observer.next(true);
      }).catch(error => {
        let errorCode = error.code;
        if (errorCode === 'auth/user-not-found') {
          observer.error('El usuario no existe');
        } else if (errorCode === 'auth/wrong-password') {
          observer.error('Contraseña incorrecta');
        } else if (errorCode === 'auth/too-many-requests') {
          observer.error('Superado el limite de peticiones, espera un momento');
        }
      })
    });
  }

  isLogged(): Observable<boolean> {
    /**
     * El usuario esta logeado?
     */
    return new Observable<boolean>((observer) => {
      this.auth.onAuthStateChanged(user => {
        if (user) {
          observer.next(true);
        } else {
          observer.next(false);
        }
      }, (error) => {
        observer.error(error);
      })
    });
  }

  logout() {
    /**
     * Cerrar Sesion
     */
    this.auth.signOut();
  }

}
