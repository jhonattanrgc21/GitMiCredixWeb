import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BuyWithoutCardService} from '../buy-without-card.service';
import {Card} from 'src/app/shared/models/card.model';

@Component({
  selector: 'second-step-make-buy',
  templateUrl: './second-step-make-buy.component.html',
  styleUrls: ['./second-step-make-buy.component.scss']
})
export class SecondStepMakeBuyComponent implements OnInit {

  pin: string;
  lifeTimePin: number;
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
      this.cards = response;
    });
  }


}
