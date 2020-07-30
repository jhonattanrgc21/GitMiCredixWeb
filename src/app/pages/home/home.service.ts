import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpService} from '../../core/services/http.service';

@Injectable()
export class HomeService {
  logOutURI = 'security/logout';

  private isTabletSubject = new Subject<boolean>();
  isTabletObs = this.isTabletSubject.asObservable();
  private isClosingSubject = new Subject<boolean>();
  isClosingObs = this.isClosingSubject.asObservable();
  private goHomeSubject = new Subject();
  goHomeObs = this.goHomeSubject.asObservable();

  constructor(private httpService: HttpService) {
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

  logOut(body: { deviceIdentifier: number, typeIncome: number }) {
    return this.httpService.post('canales', this.logOutURI, body);
  }
}
