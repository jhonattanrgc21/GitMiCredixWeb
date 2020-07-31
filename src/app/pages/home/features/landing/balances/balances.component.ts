import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StorageService} from '../../../../../core/services/storage.service';
import {Card} from '../../../../../shared/models/card.model';
import {Balances} from '../landing.component';
import {ConvertStringAmountToNumber} from '../../../../../shared/utils';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.scss']
})
export class BalancesComponent implements OnInit, OnChanges {
  @Input() balances: Balances;
  cardFormControl = new FormControl(null, []);
  cards: Card[];
  consumed: number;
  limit: number;
  available: number;
  prefix = '₡';

  constructor(private storageService: StorageService) {
    this.cards = this.storageService.getCurrentCards();

    this.cardFormControl.setValue(this.cards.find(card => card.category === 'Principal').cardId);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.balances.firstChange) {
      this.limit = ConvertStringAmountToNumber(this.balances.limit);
      this.available = ConvertStringAmountToNumber(this.balances.available);
      this.consumed = ConvertStringAmountToNumber(this.balances.consumed);
    }
  }

  getSelectedCard(): Card {
    return this.cards.find(card => card.cardId === this.cardFormControl.value);
  }

  getSelectedCardNumber(cardId: number): string {
    const cardNumber = this.cards.find(card => card.cardId === cardId).cardNumber;
    return cardNumber.substr(cardNumber.length - 8);
  }
}
