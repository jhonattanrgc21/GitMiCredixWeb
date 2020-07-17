import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class HomeService {
  private isTabletSubject = new Subject<boolean>();
  isTabletObs = this.isTabletSubject.asObservable();
  private isClosingSubject = new Subject<boolean>();
  isClosingObs = this.isClosingSubject.asObservable();
  private goHomeSubject = new Subject();
  goHomeObs = this.goHomeSubject.asObservable();

  constructor() {
  }

  isTablet(value: boolean) {
    this.isTabletSubject.next(value);
  }

  isClosing(value: boolean) {
    this.isClosingSubject.next(value);
  }

  goHome() {
    this.goHomeSubject.next();
  }
}
