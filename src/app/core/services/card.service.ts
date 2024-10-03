import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { CardReplacementData } from '../../shared/models/cards/card-service';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private readonly cardReplacementUri = 'card/replacement'

  constructor(private HttpService: HttpService) {}

  postCardReplacement(cardReplacementData: CardReplacementData) {
    return this.HttpService.post('canales', this.cardReplacementUri, cardReplacementData)
  }
}
