import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TagsService } from '../services/tags.service';
import { StorageService } from '../services/storage.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { ModalService } from '../services/modal.service';
import { TitleCardNotActiveComponent } from 'src/app/shared/components/content/title-card-not-active-content/title-card-not-active-content.component';

@Injectable()
export class titleCardGuard implements CanActivate {

  constructor(
    private tagsService: TagsService,
    private storageService: StorageService,
    private router: Router,
    private modalService: ModalService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const cardId = this.storageService.getCurrentCards().find(card => card.category === 'Principal')?.cardId

    return of(this.tagsService.titularCardNotActive).pipe(
      switchMap(cardNotActive => {
        if(cardNotActive === null){
          return this.tagsService.getHomeContent(cardId).pipe(map(() => !this.tagsService.titularCardNotActive))// if titularCardNotActive = true NOT PASS
        }
        return of(!cardNotActive) // if titularCardNotActive = true NOT PASS
      }),
      tap(canAtivateRoute => {
        if(!canAtivateRoute){
          this.router.navigate(['/home'])
          this.modalService.open({
            component: TitleCardNotActiveComponent,
          }, {width: 343, height: 339, disableClose: true, panelClass: 'titular-card-not-active-alert'})
        }
      })
    )

  }
}
