import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class ScrollService {
  private scrollEvent = new Subject<number>();
  scrollEventObs = this.scrollEvent.asObservable();

  constructor() {
  }

  emitScroll(offsetY: number) {
    this.scrollEvent.next(offsetY);
  }
}
