import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
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
  @Input() balancesTag = {
    creditLimitTag: 'Límite de crédito',
    consumedTag: 'Consumido',
    availableTag: 'Disponible',
    increaseCreditLimitTag: 'Aumentar límite',
    ibanAccountsTag: 'Cuentas IBAN',
    colonesTag: 'Colones',
    dollarsTag: 'Dólares',
  };
  @Output() cardChanged = new EventEmitter<number>();
  cardFormControl = new FormControl(null, []);
  cards: Card[];
  consumed: number;
  limit: number;
  available: number;
  prefix = '₡';

  constructor(private storageService: StorageService) {
    this.cards = this.storageService.getCurrentCards();
    this.cardFormControl.setValue(this.cards.find(card => card.category === 'Principal'));
  }

  ngOnInit(): void {
    this.onCardChanged();
  }

  onCardChanged() {
    this.cardFormControl.valueChanges.subscribe(card => {
      this.cardChanged.emit(card.cardId);
    });
  }

  formatPrincipalCard(value: string): string {
    return `${value.substr(value.length - 8, 4)} ${value.substr(value.length - 4, value.length)}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.balances) {
      this.limit = ConvertStringAmountToNumber(this.balances.limit);
      this.available = ConvertStringAmountToNumber(this.balances.available);
      this.consumed = ConvertStringAmountToNumber(this.balances.consumed);
    }
  }
}
