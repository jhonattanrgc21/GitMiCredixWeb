import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {StorageService} from '../services/storage.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private storageService: StorageService,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.storageService.getCurrentToken()) {
      this.router.navigate(['/']).then();
      return false;
    }
    return true;
  }

}
