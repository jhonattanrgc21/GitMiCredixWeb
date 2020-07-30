import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StorageService} from '../../../../../core/services/storage.service';
import {Card} from '../../../../../shared/models/card.model';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.scss']
})
export class BalancesComponent implements OnInit {
  cardFormControl = new FormControl(null, []);
  cards: Card[];
  amount = 250000.55;
  max = 1000000;
  min = 0;
  prefix = '₡';

  constructor(private storageService: StorageService) {
    this.cards = this.storageService.getCurrentCards();

    this.cardFormControl.setValue(this.cards.find(card => card.category === 'Principal').cardId);
  }

  ngOnInit(): void {
  }

  getSelectedCard(): Card {
    return this.cards.find(card => card.cardId === this.cardFormControl.value);
  }

  getSelectedCardNumber(cardId: number): string {
    const cardNumber = this.cards.find(card => card.cardId === cardId).cardNumber;
    return cardNumber.substr(cardNumber.length - 8);
  }
}
