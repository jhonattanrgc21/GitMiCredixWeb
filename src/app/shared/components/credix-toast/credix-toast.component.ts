import {Component, OnDestroy, OnInit} from '@angular/core';
import {credixToastAnimations} from './credix-toast-animation';
import {ToastData} from './credix-toast-config';
import {ToastRef} from './credix-toast-ref';

@Component({
  selector: 'app-credix-toast',
  templateUrl: './credix-toast.component.html',
  styleUrls: ['./credix-toast.component.scss'],
  animations: [credixToastAnimations.fadeToast],
})
export class CredixToastComponent implements OnInit, OnDestroy {
  show = true;
  private intervalId: number;

  constructor(readonly data: ToastData, readonly ref: ToastRef) {
  }

  ngOnInit() {
    this.intervalId = window.setTimeout(() => {
      this.show = false;
    }, 3000);
  }

  onAnimationDone(event) {
    if (event.toState === 'void' && !this.show) {
      this.ref.close();
    }
  }

  ngOnDestroy() {
    clearTimeout(this.intervalId);
  }
}
