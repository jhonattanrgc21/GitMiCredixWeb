import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {
  private loading = false;
  private loadingStatus: Subject<boolean> = new Subject();
  loadingStatusObs = this.loadingStatus.asObservable();

  constructor() {
  }

  get Loading(): boolean {
    return this.loading;
  }

  set Loading(value) {
    this.loading = value;
    this.loadingStatus.next(value);
  }

  startLoading() {
    this.Loading = true;
  }

  stopLoading() {
    this.Loading = false;
  }

}
