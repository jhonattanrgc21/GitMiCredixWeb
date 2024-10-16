import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Card } from '../../models/card';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'credix-cards-list-selection',
  templateUrl: './credix-cards-list-selection.component.html',
  styleUrls: ['./credix-cards-list-selection.component.scss']
})
export class CredixCardsListSelectionComponent implements OnInit {
  @Output() selectedCardsChanged = new EventEmitter<Card[]>()

  cards: Card[] = []
  selectedCards: Card[] = []

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.cards = this.storageService.getCurrentCards()
  }

  pushOrRemoveCard(event: { checked: boolean, value: Card }) {
    if (event.checked) {
      this.selectedCards.push(event.value)
    } else {
      this.selectedCards = this.selectedCards.filter(card => card.cardId !== event.value.cardId)
    }
    this.selectedCardsChanged.emit(this.selectedCards)
  }

}
