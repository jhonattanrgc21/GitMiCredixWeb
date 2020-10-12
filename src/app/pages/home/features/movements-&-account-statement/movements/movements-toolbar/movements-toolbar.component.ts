import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StorageService} from '../../../../../../core/services/storage.service';
import {Card} from '../../../../../../shared/models/card';
import {MovementsService} from '../movements.service';
import {ScrollService} from '../../../../../../core/services/scroll.service';

@Component({
  selector: 'app-movements-toolbar',
  templateUrl: './movements-toolbar.component.html',
  styleUrls: ['./movements-toolbar.component.scss']
})
export class MovementsToolbarComponent implements OnInit {
  cardFormControl = new FormControl(null, []);
  cards: Card[];
  hideToolbar = false;

  constructor(private movementsService: MovementsService,
              private scrollService: ScrollService,
              private storageService: StorageService) {
    this.cards = this.storageService.getCurrentCards();
    this.cardFormControl.setValue(this.cards.find(card => card.category === 'Principal'));
  }

  ngOnInit(): void {
    this.selectedCardChanged();
    this.getScrollEvent();
    this.getMovements();
  }

  selectedCardChanged() {
    this.cardFormControl.valueChanges.subscribe(value => {
      this.getMovements(value.cardId);
    });
  }

  getScrollEvent() {
    this.scrollService.scrollEventObs.subscribe(offsetY => this.hideToolbar = offsetY > 10);
  }

  getMovements(cardId = this.storageService.getCurrentCards().find(card => card.category === 'Principal').cardId) {
    this.movementsService.getMovements(cardId).subscribe(movements => this.movementsService.setDataSource(movements));
  }
}
