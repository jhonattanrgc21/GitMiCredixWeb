import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';
import { Card } from 'src/app/shared/models/card';
import { CardPin } from 'src/app/shared/models/card-pin';
import { ChangePinService } from '../pin-code.service';
import { TagsService } from 'src/app/core/services/tags.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-current-pin',
  templateUrl: './current-pin.component.html',
  styleUrls: ['./current-pin.component.scss']
})
export class CurrentPinComponent implements OnInit {

  titularCardNotActive: boolean = null
  cards: Card[];
  cardsPin: CardPin[];

  constructor(
    private changePinService: ChangePinService,
    private storageService: StorageService,
    private tagsService: TagsService
  ) {}

  ngOnInit(): void {
    this.cardsPin = [];
    this.cards = this.storageService.getCurrentCards();

    this.checkIfTitleCardIsActive()
  }

  checkIfTitleCardIsActive(){
    of(1).pipe(
      switchMap(() => {
        if(this.tagsService.titularCardNotActive === null){
          const cardId = this.storageService.getCurrentCards().find(card => card.category === 'Principal')?.cardId
          return this.tagsService.getHomeContent(cardId).pipe(map(() => this.tagsService.titularCardNotActive))
        }
        return of(1)
      }),
      tap(() => {
        this.titularCardNotActive = this.tagsService.titularCardNotActive
        this.loadCardsPin()
      })
    ).subscribe()
  }

  loadCardsPin()  {
    this.cards.forEach((card) => {
      this.changePinService.currentPin( card.cardId ).subscribe((crdPin) => {
        let status = 3;
        let pin;

        if ( crdPin && ( crdPin?.type === 'success' ) ) {
          if ( crdPin.pinStatus == '1' ) {
            pin = crdPin.pin.slice(0, 10);
            status = 1;
          } else {
            pin = 'En proceso';
          }

          this.cardsPin.push({
            ...card,
            status,
            pin,
          });
        }
      })
    });
  }
}
