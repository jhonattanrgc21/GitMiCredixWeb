import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';
import { Card } from 'src/app/shared/models/card';
import { CardPin } from 'src/app/shared/models/card-pin';
import { ChangePinService } from '../pin-code.service';

@Component({
  selector: 'app-current-pin',
  templateUrl: './current-pin.component.html',
  styleUrls: ['./current-pin.component.scss']
})
export class CurrentPinComponent implements OnInit {

  cards: Card[];
  cardsPin: CardPin[];

  constructor(
    private changePinService: ChangePinService,
    private storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.cardsPin = [];
    this.cards = this.storageService.getCurrentCards();

    this.loadCardsPin();
  }

  loadCardsPin()  {
    this.cards.forEach((card) => {
      this.changePinService.currentPin( card.cardId ).subscribe((crdId) => {
        let status = 0;
        let pin;

        if ( crdId instanceof Array ) {
          pin = 'En proceso';
        } else {
          pin = crdId.slice(0, 10);
          status = 1;
        }

        this.cardsPin.push({
          ...card,
          status,
          pin,
        });
      })
    });
  }
}
