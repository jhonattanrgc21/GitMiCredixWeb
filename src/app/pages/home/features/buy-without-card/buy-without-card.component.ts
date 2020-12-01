import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {CdkStepper} from '@angular/cdk/stepper';
import {BuyWithoutCardService} from './buy-without-card.service';
import {TagsService} from '../../../../core/services/tags.service';
import {Tag} from '../../../../shared/models/tag';
import {Router} from '@angular/router';
import {Card} from '../../../../shared/models/card';
import {StorageService} from '../../../../core/services/storage.service';
import {CredixCodeErrorService} from '../../../../core/services/credix-code-error.service';

@Component({
  selector: 'app-buy-without-card',
  templateUrl: './buy-without-card.component.html',
  styleUrls: ['./buy-without-card.component.scss']
})
export class BuyWithoutCardComponent implements OnInit, OnDestroy {
  credixCode: FormControl = new FormControl(null, [Validators.required, Validators.minLength(6)]);
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
  errorResponse = false;
  @ViewChild('buyWithOutCard') stepper: CdkStepper;

  constructor(private buyWithOutCardService: BuyWithoutCardService,
              private credixCodeErrorService: CredixCodeErrorService,
              private tagsService: TagsService,
              private storageService: StorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Compra sin tarjeta').tags));
    this.cards = this.storageService.getCurrentCards();
    this.cardControl.setValue(this.cards.find(element => element.category === 'Principal').cardId);
    this.credixCodeErrorService.credixCodeError$.subscribe(() => {
      this.credixCode.setErrors({invalid: true});
    });
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
      .subscribe(response => {
        if (response.type === 'success') {
          this.applicantIdentification = response.applicantIdentification;
          this.lifeTimePin = response.lifeTimePin;
          this.pin = response.pin;
          this.name = response.printName;
        } else {
          this.errorResponse = response.type === 'error';
        }
      });
  }

  onCardChanged() {
    this.cardControl.valueChanges.subscribe(() => {
      this.generatePin();
    });
  }

  checkCredixCode() {
    this.buyWithOutCardService.checkCredixCode(this.credixCode.value).subscribe(result => {
        if (result.type === 'success') {
          this.generatePin();
          this.onCardChanged();
          this.continue();
        }
      }
    );
  }

  getTags(tags: Tag[]) {
    this.subtitle = tags.find(tag => tag.description === 'compra.subtitle')?.value;
    this.title = tags.find(tag => tag.description === 'compra.title')?.value;
    this.step2 = tags.find(tag => tag.description === 'compra.stepper2')?.value;
    this.step1 = tags.find(tag => tag.description === 'compra.stepper1')?.value;
  }

  ngOnDestroy(): void {
    this.buyWithOutCardService.unsubscribe();
  }
}
