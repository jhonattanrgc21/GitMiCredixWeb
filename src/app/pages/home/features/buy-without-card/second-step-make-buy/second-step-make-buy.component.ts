import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BuyWithoutCardService} from '../buy-without-card.service';
import {Card} from 'src/app/shared/models/card.model';

@Component({
  selector: 'second-step-make-buy',
  templateUrl: './second-step-make-buy.component.html',
  styleUrls: ['./second-step-make-buy.component.scss']
})
export class SecondStepMakeBuyComponent implements OnInit, OnChanges {

  pin: string;
  lifeTimePin: number;
  second = 59;
  cards: Card[];
  identification: string;
  name: string;
  @Input() card: FormControl = new FormControl();
  @Input() isActive: boolean;

  constructor(private buyWithOutCardService: BuyWithoutCardService) {
  }

  ngOnInit(): void {
    this.getUserAplicantAccountNumberAndCardList();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isActive && this.isActive) {
      this.countDownCalculate();
    }
  }

  getUserAplicantAccountNumberAndCardList() {
    this.buyWithOutCardService.dataGeneratePin.subscribe(response => {
      this.getCardListByIdentification(response.applicantIdentification);
      this.identification = response.applicantIdentification;
      this.name = response.printName;
      this.pin = response.pin;
      this.lifeTimePin = response.lifeTimePin;
    });
  }

  getCardListByIdentification(iden: string) {
    this.buyWithOutCardService.getCardListByIdentification(iden).subscribe(response => {
      if (response.length === 1) {
        this.card.setValue(response.cardId);
      }
      this.cards = response;
    });
  }

  countDownCalculate() {
    if (this.second === 59) {
      this.lifeTimePin--;
    }

    const interval = setInterval(() => {
      this.second--;

      if (this.second === 0) {
        this.second += 59;
        this.lifeTimePin--;
      }

      if (this.lifeTimePin === 0) {
        this.second--;
      }
      if (this.lifeTimePin === 0 && this.second === 0) {
        clearInterval(interval);
      }
    }, 1000);
  }

}
