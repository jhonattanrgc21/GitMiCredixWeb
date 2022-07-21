import { Injectable } from '@angular/core';
import { ModalService } from './modal.service';
import { timer } from 'rxjs';
import { HomeService } from 'src/app/pages/home/home.service';
import { globalCacheBusterNotifier } from 'ngx-cacheable';
import { Router } from '@angular/router';
import { SignInService } from 'src/app/pages/sign/features/sign-in/sign-in.service';
import { HttpRequestsResponseInterceptor } from '../interceptors/http.interceptor';

@Injectable({
  providedIn: 'root'
})
export class RenewTokenService {

  timeLeft: number | 1800;
  interval;
  subscribeTimer: any;
  requestsCount = 0;

  constructor(private modalService : ModalService,
              public homeService: HomeService,
              private router: Router,
              private readonly signInService: SignInService) { }

  observerableTimer() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      this.subscribeTimer = this.timeLeft - val;
    });
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft === 60){
        this.modalService.confirmationPopup('Aviso','Su sesión está por finalizar ¿Desea continuar logueado en el sitio web?', 500,250,true,59000).subscribe(response => {
          if (response ){
            this.renewToken();
          }else if(response !== undefined){
              this.signOut();
          }else{
            this.modalService.confirmationPopup('Aviso','Su sesión ha vencido, por favor inicie sesión nuevamente.', 500, 250, undefined, undefined, true).subscribe(response => {
              this.signOut();
            });
          }
        });
      }
      this.timeLeft--;
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  stopTimer(){
    clearInterval(this.interval);
    this.timeLeft = 0;
  }

  clearTimer(time: number | 1800){
    this.timeLeft = time;
  }

  signOut() {
    this.resetRequestCount;
    this.stopTimer();
    this.homeService.logOut({
      deviceIdentifier: 1213123134,
      typeIncome: 2
    }).subscribe(response => {
      globalCacheBusterNotifier.next();
      this.router.navigate(['/']);
    }, error => {
      globalCacheBusterNotifier.next();
      this.router.navigate(['/']);
    });
  }

  renewToken() {
    this.signInService.renewToken();
  }

  resetRequestCount(){
    this.requestsCount = 0;
  }

  increaseRequestCount(){
    this.requestsCount++;
  }


}
