import {Injectable, Injector} from '@angular/core';
import {Overlay} from '@angular/cdk/overlay';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {ToastData} from '../../shared/components/credix-toast/credix-toast-config';
import {CredixToastComponent} from '../../shared/components/credix-toast/credix-toast.component';
import {ToastRef} from '../../shared/components/credix-toast/credix-toast-ref';

const LEFT_POSITION = 16;
const TOP_POSITION = 16;

@Injectable()
export class CredixToastService {
  private lastToast: ToastRef;

  constructor(private overlay: Overlay, private parentInjector: Injector) {
  }

  show(data: ToastData) {
    const positionStrategy = this.getPositionStrategy();
    const overlayRef = this.overlay.create({positionStrategy});
    const toastRef = new ToastRef(overlayRef);
    this.lastToast = toastRef;
    const injector = this.getInjector(data, toastRef, this.parentInjector);
    const toastPortal = new ComponentPortal(CredixToastComponent, null, injector);
    overlayRef.attach(toastPortal);
    return toastRef;
  }

  getPositionStrategy() {
    return this.overlay.position()
      .global()
      .top(`${TOP_POSITION}px`)
      .left(LEFT_POSITION + 'px');
  }

  getInjector(data: ToastData, toastRef: ToastRef, parentInjector: Injector) {
    const tokens = new WeakMap();
    tokens.set(ToastData, data);
    tokens.set(ToastRef, toastRef);
    return new PortalInjector(parentInjector, tokens);
  }
}
