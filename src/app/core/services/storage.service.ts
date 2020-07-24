import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../shared/models/user.model';
import {Card} from '../../shared/models/card.model';

@Injectable()
export class StorageService {
  public user: User;
  private localStorageService;
  private card: Card[] = [];

  constructor(private router: Router) {
    this.localStorageService = localStorage;
  }

  setCurrentSession(data: any): void {
    this.user = {
      userId: data.json.userId,
      aplId: data.json.aplId,
      actId: data.json.actId,
      accountNumber: data.json.accountNumber,
      securityToken: data.json.securityToken,
      aplicantName: data.json.securityToken
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

  getCurrentCard(): Card[] {
    const card: Card[] = this.localStorageService.getItem('card');
    return (card) ? card : null;
  }

  isAuthenticated(): boolean {
    return this.getCurrentToken() != null;
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

  logout(): void {
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }
}
