import {Injectable} from '@angular/core';
import {User} from '../../shared/models/user';
import {Card} from '../../shared/models/card';

@Injectable()
export class StorageService {
  deviceIdentifier: string;

  constructor() {
  }

  setCurrentSession(user: User, cards: Card[]): void {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('cards', JSON.stringify(cards));
  }

  removeCurrentSession(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('cards');
    localStorage.removeItem('token');
  }

  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('user')) as User;
  }

  clearCurrentUser() {
    localStorage.removeItem('user');
  }

  getCurrentCards() {
    return JSON.parse(localStorage.getItem('cards')) as Card[];
  }

  clearCurrentCard() {
    localStorage.removeItem('cards');
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

  getUuid(): string {
    return localStorage.getItem('uuid');
  }

  setUuid(uuid: string): void {
    localStorage.setItem('uuid', uuid);
  }

  clearUuid(): void {
    localStorage.removeItem('uuid');
  }
}
