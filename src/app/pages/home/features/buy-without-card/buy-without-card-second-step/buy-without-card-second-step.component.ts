import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Card} from 'src/app/shared/models/card';
import {TagsService} from '../../../../../core/services/tags.service';
import {Tag} from '../../../../../shared/models/tag';

@Component({
  selector: 'app-buy-without-card-second-step',
  templateUrl: './buy-without-card-second-step.component.html',
  styleUrls: ['./buy-without-card-second-step.component.scss']
})
export class BuyWithoutCardSecondStepComponent implements OnInit, OnChanges {
  @Input() cardControl: FormControl = new FormControl();
  @Input() isActive: boolean;
  @Input() cards: Card[];
  @Input() pin: string;
  @Input() lifeTimePin: number;
  @Input() identification: string;
  @Input() name: string;
  second = 59;
  secondStepSecondSub: string;
  secondStepSub: string;
  nameTag: string;
  identTag: string;
  expiresTag: string;

  constructor(private tagsService: TagsService) {
  }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Compra sin tarjeta').tags)
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.lifeTimePin && changes.pin) {
      this.countDownCalculate();
    }
  }

  getTags(tags: Tag[]) {
    this.secondStepSecondSub = tags.find(tag => tag.description === 'compra.stepper2.subtitle2').value;
    this.secondStepSub = tags.find(tag => tag.description === 'compra.stepper2.subtitle').value;
    this.nameTag = tags.find(tag => tag.description === 'compra.stepper2.tag.nombre').value;
    this.identTag = tags.find(tag => tag.description === 'compra.stepper2.tag.identificacion').value;
    this.expiresTag = tags.find(tag => tag.description === 'compra.stepper2.tag.expira').value;
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
