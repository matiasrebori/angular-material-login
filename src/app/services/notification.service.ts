import { Injectable } from '@angular/core';
import {
  ToastNotificationInitializer,
  DialogLayoutDisplay,
  ToastUserViewTypeEnum,
  ToastProgressBarEnum,
  DisappearanceAnimation,
  AppearanceAnimation,
  ToastPositionEnum,
  ConfirmBoxEvokeService,
} from '@costlydeveloper/ngx-awesome-popup';
import {Observable} from "rxjs";
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private popUp: ConfirmBoxEvokeService, private toast: HotToastService ) { }

  confirmDelete(message:string, confirm:string, decline:string): Observable<boolean>{
    return new Observable<boolean>((observer) => {
      this.popUp.danger('', message, confirm, decline)
        .subscribe(resp => {
          if(resp.success){
            observer.next(true);
          }else{
            observer.next(false);
          }
        })
    });
  }

  exito(message:string) {
    const newToastNotification = new ToastNotificationInitializer();

    newToastNotification.setTitle('');
    newToastNotification.setMessage(message);

    // Choose layout color type
    newToastNotification.setConfig({
      autoCloseDelay: 2500, // optional
      textPosition: 'center', // optional
      layoutType: DialogLayoutDisplay.CUSTOM_ONE, // SUCCESS | INFO | NONE | DANGER | WARNING
      progressBar: ToastProgressBarEnum.NONE, // INCREASE | DECREASE | NONE
      toastUserViewType: ToastUserViewTypeEnum.SIMPLE, // STANDARD | SIMPLE
      animationIn: AppearanceAnimation.FADE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
      animationOut: DisappearanceAnimation.ZOOM_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
      // TOP_LEFT | TOP_CENTER | TOP_RIGHT | TOP_FULL_WIDTH | BOTTOM_LEFT | BOTTOM_CENTER | BOTTOM_RIGHT | BOTTOM_FULL_WIDTH
      toastPosition: ToastPositionEnum.TOP_CENTER,
    });

    // Simply open the popup
    newToastNotification.openToastNotification$();
  }

  exitoToast(message: string) {
    this.toast.success(message, {
      duration: 3000,
    });
  }

  errorToast(message: string) {
    this.toast.error(message, {
      duration: 3000,
    });
  }
}
