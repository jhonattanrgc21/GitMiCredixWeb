import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable()
export class HomeSidebarService {
  private closeMessagesSub = new Subject();
  closeMessagesObs = this.closeMessagesSub.asObservable();
  private closeSubmenuSub = new Subject();
  closeSubmenuObs = this.closeSubmenuSub.asObservable();
  private _enableOptionPersonalCredit$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
  }

  get enableOptionPersonalCredit$(): Observable<boolean>{
    return this._enableOptionPersonalCredit$.asObservable();
  }

  setEnableOptionPersonalCredit(value: boolean){
    this._enableOptionPersonalCredit$.next(value);
  }

  closeMessages() {
    this.closeMessagesSub.next();
  }

  closeSubmenu() {
    this.closeSubmenuSub.next();
  }
}
