import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class CredixCodeErrorService {
  private credixCodeError = new Subject<void>();
  credixCodeError$ = this.credixCodeError.asObservable();

  constructor() {
  }

  emitCredixCodeError(): void {
    this.credixCodeError.next();
  }
}
