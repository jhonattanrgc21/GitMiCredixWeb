import {Injectable} from '@angular/core';

@Injectable()
export class CredixBotService {
  constructor() {
  }

  // tslint:disable-next-line:variable-name
  private _isFromBot: boolean;

  get isFromBot(): boolean {
    return this._isFromBot;
  }

  set isFromBot(isFromBot: boolean) {
    this._isFromBot = isFromBot;
  }

  // tslint:disable-next-line:variable-name
  private _redirectUri: string;

  get redirectUri(): string {
    return this._redirectUri;
  }

  set redirectUri(redirectUri: string) {
    this._redirectUri = redirectUri;
  }

  // tslint:disable-next-line:variable-name
  private _accountLinkingToken: string;

  get accountLinkingToken(): string {
    return this._accountLinkingToken;
  }

  set accountLinkingToken(value: string) {
    this._accountLinkingToken = value;
  }
}
