import {Injectable} from '@angular/core';
import {User} from '../../shared/models/user.model';
import {Card} from '../../shared/models/card.model';

@Injectable()
export class StorageService {
  public user: User;
  private localStorageService;
  private card: Card[] = [];

  constructor() {
    this.localStorageService = localStorage;
  }

  setCurrentSession(data: any): void {
    this.user = {
      userId: data.json.userId,
      aplId: data.json.aplId,
      actId: data.json.actId,
      accountNumber: data.json.accountNumber,
      securityToken: data.json.securityToken,
      aplicantName: data.json.aplicantName
    };
    this.card = data.json.cardNumberList;
    this.localStorageService.setItem('user', JSON.stringify(this.user));
    this.localStorageService.setItem('card', JSON.stringify(this.card));
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem('user');
    this.localStorageService.removeItem('card');
    this.localStorageService.removeItem('token');
  }

  getCurrentUser(): User {
    return this.localStorageService.getItem('user') as User;
  }

  getCurrentCards() {
    return JSON.parse(localStorage.getItem('card')) as Card[];
  }

  getCurrentToken(): string {
    const token = this.localStorageService.getItem('token');
    return (token) ? token : null;
  }

  setCurrentToken(token: string): void {
    this.localStorageService.setItem('token', token);
  }

  clearCurrentToken(): void {
    this.localStorageService.removeItem('token');
  }
}
