import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class GoHomeService {
  private goHomeSubject = new Subject();
  goHomeObs = this.goHomeSubject.asObservable();

  constructor() {
  }

  goHome() {
    this.goHomeSubject.next();
  }
}
