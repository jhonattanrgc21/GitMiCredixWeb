import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CdkStepper} from '@angular/cdk/stepper';

@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  styleUrls: ['./send-money.component.scss']
})
export class SendMoneyComponent implements OnInit, AfterViewInit {
  informationForm: FormGroup = new FormGroup({
    account: new FormControl(null, [Validators.required])
  });
  amountAndQuotaForm: FormGroup = new FormGroup({});
  confirmForm: FormGroup = new FormGroup({});
  selectedIndex = 0;
  disableButton = true;
  @ViewChild('sendMoneyStepper') stepper: CdkStepper;

  constructor() {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    console.log(this.stepper.selectedIndex);
    this.setEnableButton();
  }

  setEnableButton() {
    switch (this.stepper.selectedIndex) {
      case 0 :
        this.informationForm.valueChanges.subscribe(value => {
          this.disableButton = this.informationForm.invalid;
        });
        break;
      case 1:
        this.amountAndQuotaForm.valueChanges.subscribe(value => {
          this.disableButton = this.amountAndQuotaForm.invalid;
        });
        break;
      case 2:
        this.confirmForm.valueChanges.subscribe(value => {
          this.disableButton = this.confirmForm.invalid;
        });
        break;
    }
  }

  next() {
    this.selectedIndex++;
    this.stepper.next();
    this.setEnableButton();
  }

  back() {
    this.selectedIndex--;
    this.stepper.previous();
    this.setEnableButton();
  }

}
