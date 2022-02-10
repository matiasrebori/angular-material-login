import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {BreakpointObserver} from "@angular/cdk/layout";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private observer: BreakpointObserver) { }

  esTelefono(){
    return new Observable<any>((observer) => {

      this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
        // si width es menor a 800px, osea tipo telefono
        if (res.matches) {
          observer.next(true);
          //si width es mayor osea tipo desktop
        } else {
          observer.next(false);
        }
      });
    });
  }

}
