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
    private route: Router,
    private changePinService: ChangePinService,
    private storageService: StorageService,
    private activateRoute: ActivatedRoute,
    ) {}

  ngOnInit(): void {
    this.cardsPin = [];
    this.cards = this.storageService.getCurrentCards();

    this.cards.forEach((card) => {
      this.changePinService.currentPin( card.cardId ).subscribe((crdId) => {
        this.cardsPin.push({
          ...card,
          pin: crdId.slice(0, 5),
        });
      })
    });
  }
}
