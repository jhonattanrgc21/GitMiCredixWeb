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

  setCurrentSession(data: any, identification: string): void {
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
    this.localStorageService.setItem('identification', JSON.stringify(identification));
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem('user');
    this.localStorageService.removeItem('card');
    this.localStorageService.removeItem('token');
  }

  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('user')) as User;
  }

  clearCurrentUser() {
    localStorage.removeItem('user');
  }

  getCurrentCards() {
    return JSON.parse(localStorage.getItem('card')) as Card[];
  }

  clearCurrentCard() {
    localStorage.removeItem('card');
  }

  getIdentification(): string {
    return localStorage.getItem('identification');
  }

  clearIdentification(): void {
    localStorage.removeItem('identification');
  }

  getCurrentToken(): string {
    return localStorage.getItem('token');
  }

  setCurrentToken(token: string): void {
    localStorage.setItem('token', token);
  }

  clearCurrentToken(): void {
    localStorage.removeItem('token');
  }
}
