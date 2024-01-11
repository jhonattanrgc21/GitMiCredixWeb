import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CredixMasService {

  constructor() { }

  private _subscription: boolean = false;

  toggleSubscription(value: boolean): void {
    this._subscription = value;
  }

  get subscription(): boolean {
    return this._subscription;
  }

}
