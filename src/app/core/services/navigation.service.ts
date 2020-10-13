import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class NavigationService {
  private goHomeSubject = new Subject();
  goHomeObs = this.goHomeSubject.asObservable();
  private submenuChangedSubject = new Subject<string>();
  submenuChanged$ = this.submenuChangedSubject.asObservable();

  constructor() {
  }

  goHome() {
    this.goHomeSubject.next();
  }

  submenuChanged(route: string) {
    this.submenuChangedSubject.next(route);
  }
}
