import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpService} from '../../core/services/http.service';
import {StorageService} from '../../core/services/storage.service';
import {map} from 'rxjs/operators';

@Injectable()
export class HomeService {
  private logOutURI = 'security/logout';
  private messagesUri = 'messagesrewards/messages/user';
  private markMessageReadUri = `messagesrewards/messages`;

  private isTabletSubject = new Subject<boolean>();
  isTabletObs = this.isTabletSubject.asObservable();
  private isClosingSubject = new Subject<boolean>();
  isClosingObs = this.isClosingSubject.asObservable();

  constructor(private httpService: HttpService,
              private localStorage: StorageService) {
  }

  isTablet(value: boolean) {
    this.isTabletSubject.next(value);
  }

  isClosing(value: boolean) {
    this.isClosingSubject.next(value);
  }

  getMessages() {
    return this.httpService.post('canales', this.messagesUri + `/${this.localStorage.getCurrentUser().userId}`,
      {usuId: this.localStorage.getCurrentUser().userId})
      .pipe(map(response => {
        return response.json;
      }));
  }

  markMessageRead(messageId: number) {
    return this.httpService.put('canales', this.markMessageReadUri
      + `/${messageId}/user/${this.localStorage.getCurrentUser().userId}`,
      {
        usuId: this.localStorage.getCurrentUser().userId,
        read: true
      })
      .pipe(map(response => {
        return response.json;
      }));
  }


  logOut(body: { deviceIdentifier: number, typeIncome: number }) {
    return this.httpService.post('canales', this.logOutURI, body);
  }
}
