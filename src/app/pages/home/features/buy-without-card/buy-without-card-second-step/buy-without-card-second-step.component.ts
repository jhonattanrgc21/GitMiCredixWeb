import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BuyWithoutCardService} from '../buy-without-card.service';
import {Card} from 'src/app/shared/models/card.model';
import {TagsService} from '../../../../../core/services/tags.service';
import {Tag} from '../../../../../shared/models/tag';

@Component({
  selector: 'app-buy-without-card-second-step',
  templateUrl: './buy-without-card-second-step.component.html',
  styleUrls: ['./buy-without-card-second-step.component.scss']
})
export class BuyWithoutCardSecondStepComponent implements OnInit, OnChanges {

  pin: string;
  lifeTimePin: number;
  second = 59;
  cards: Card[];
  identification: string;
  name: string;
  step2Subt2;
  step2Subt;
  nameTag;
  identTag;
  expiresTag;


  @Input() card: FormControl = new FormControl();
  @Input() isActive: boolean;

  constructor(private tagsService: TagsService,private buyWithOutCardService: BuyWithoutCardService) {
  }

  ngOnInit(): void {
    this.getUserAplicantAccountNumberAndCardList();
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Compra sin tarjeta').tags)
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isActive && this.isActive) {
      this.countDownCalculate();
    }
  }

  getTags(tags: Tag[]) {
    this.step2Subt2 = tags.find(tag => tag.description === 'compra.stepper2.subtitle2').value;
    this.step2Subt = tags.find(tag => tag.description === 'compra.stepper2.subtitle').value;
    this.nameTag = tags.find(tag => tag.description === 'compra.stepper2.tag.nombre').value;
    this.identTag = tags.find(tag => tag.description === 'compra.stepper2.tag.identificacion').value;
    this.expiresTag = tags.find(tag => tag.description === 'compra.stepper2.tag.expira').value;
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
