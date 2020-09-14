import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {CdkStepper} from '@angular/cdk/stepper';
import {BuyWithoutCardService} from './buy-without-card.service';
import {TagsService} from '../../../../core/services/tags.service';
import {Tag} from '../../../../shared/models/tag';

@Component({
  selector: 'app-buy-without-card',
  templateUrl: './buy-without-card.component.html',
  styleUrls: ['./buy-without-card.component.scss']
})
export class BuyWithoutCardComponent implements OnInit {
  codeCredix: FormControl = new FormControl(null, [Validators.required]);
  card: FormControl = new FormControl(null, [Validators.required]);
  stepperIndex = 0;
  subtitle: string;
  title: string;
  step2: string;
  step1: string;
  @ViewChild('buyWithOutCard') stepper: CdkStepper;

  constructor(private tagsService: TagsService,
              private buyWithOutCardService: BuyWithoutCardService) {
  }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Compra sin tarjeta').tags)
    );
  }

  getTags(tags: Tag[]) {
    this.subtitle = tags.find(tag => tag.description === 'compra.subtitle').value;
    this.title = tags.find(tag => tag.description === 'compra.title').value;
    this.step2 = tags.find(tag => tag.description === 'compra.stepper2').value;
    this.step1 = tags.find(tag => tag.description === 'compra.stepper1').value;
}

  continue() {
    this.stepper.next();
    this.stepperIndex = this.stepper.selectedIndex;
  }

  back() {
    this.stepper.previous();
    this.stepperIndex = this.stepper.selectedIndex;
    this.stepper.reset();
  }

  generatePin(codeCredix: string) {
    this.buyWithOutCardService.generatePin(codeCredix).subscribe(response => {
      if (response.type === 'success') {
        this.buyWithOutCardService
          .emitDataGeneratePin(response.applicantIdentification, response.lifeTimePin, response.message, response.pin, response.printName);
        this.continue();
      }
    });
  }

  getPin() {
    this.generatePin(this.codeCredix.value.toString());
  }
}
