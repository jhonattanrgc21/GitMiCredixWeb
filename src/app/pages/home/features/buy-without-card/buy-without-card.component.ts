import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {CdkStepper} from '@angular/cdk/stepper';
import {BuyWithoutCardService} from './buy-without-card.service';
import {TagsService} from '../../../../core/services/tags.service';
import {Tag} from '../../../../shared/models/tag';
import {Router} from '@angular/router';
import {Card} from '../../../../shared/models/card';
import {StorageService} from '../../../../core/services/storage.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-buy-without-card',
  templateUrl: './buy-without-card.component.html',
  styleUrls: ['./buy-without-card.component.scss']
})
export class BuyWithoutCardComponent implements OnInit {
  codeCredix: FormControl = new FormControl(null, [Validators.required]);
  cardControl: FormControl = new FormControl(null, [Validators.required]);
  cards: Card[];
  applicantIdentification: string;
  name: string;
  lifeTimePin: number;
  pin: string;
  stepperIndex = 0;
  subtitle: string;
  title: string;
  step2: string;
  step1: string;
  @ViewChild('buyWithOutCard') stepper: CdkStepper;

  constructor(private buyWithOutCardService: BuyWithoutCardService,
              private tagsService: TagsService,
              private storageService: StorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Compra sin tarjeta').tags));
    this.cards = this.storageService.getCurrentCards();
    this.cardControl.setValue(this.cards.find(element => element.category === 'Principal').cardId);
  }

  continue() {
    this.stepper.next();
    this.stepperIndex = this.stepper.selectedIndex;
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  generatePin() {
    this.buyWithOutCardService.generatePin(this.cardControl.value)
      .pipe(finalize(() => {
        if (this.stepperIndex === 0) {
          this.continue();
        }
      }))
      .subscribe(response => {
        if (response.type === 'success') {
          this.applicantIdentification = response.applicantIdentification;
          this.lifeTimePin = response.lifeTimePin;
          this.pin = response.pin;
          this.name = response.printName;
        }
      });
  }

  onCardChanged() {
    this.cardControl.valueChanges.subscribe(value => {
      this.generatePin();
    });
  }

  checkCredixCode() {
    this.buyWithOutCardService.checkCredixCode(this.codeCredix.value)
      .subscribe(response => {
          if (response.type === 'success') {
            this.generatePin();
            this.onCardChanged();
          }
        }
      );
  }

  getTags(tags: Tag[]) {
    this.subtitle = tags.find(tag => tag.description === 'compra.subtitle').value;
    this.title = tags.find(tag => tag.description === 'compra.title').value;
    this.step2 = tags.find(tag => tag.description === 'compra.stepper2').value;
    this.step1 = tags.find(tag => tag.description === 'compra.stepper1').value;
  }
}
