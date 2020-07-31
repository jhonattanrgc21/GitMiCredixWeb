import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeNavigationMenuService {
  private closeMessagesSub = new Subject();
  closeMessagesObs = this.closeMessagesSub.asObservable();
  private closeSubmenuSub = new Subject();
  closeSubmenuObs = this.closeSubmenuSub.asObservable();

  constructor() {
  }

  closeMessages() {
    this.closeMessagesSub.next();
  }

  closeSubmenu() {
    this.closeSubmenuSub.next();
  }
}
