import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {CdkStepper} from '@angular/cdk/stepper';
import {BuyWithoutCardService} from './buy-without-card.service';

@Component({
  selector: 'app-buy-without-card',
  templateUrl: './buy-without-card.component.html',
  styleUrls: ['./buy-without-card.component.scss']
})
export class BuyWithoutCardComponent implements OnInit {

  stepperIndex = 0;

  codeCredix: FormControl = new FormControl(null, [Validators.required]);
  card: FormControl = new FormControl(null, [Validators.required]);

  @ViewChild('buyWithOutCard') stepper: CdkStepper;

  constructor(private buyWithOutCardService: BuyWithoutCardService) {
  }

  ngOnInit(): void {
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
        // tslint:disable-next-line:max-line-length
        this.buyWithOutCardService.emitDataGeneratePin(response.applicantIdentification, response.lifeTimePin, response.message, response.pin, response.printName);
        this.continue();
      }
    });
  }

  getPin() {
    this.generatePin(this.codeCredix.value.toString());
  }
}
