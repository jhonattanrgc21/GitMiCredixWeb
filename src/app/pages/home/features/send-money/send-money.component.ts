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
  amountAndQuotaForm: FormGroup = new FormGroup({
    amount: new FormControl(null, [Validators.required]),
    quotas: new FormControl(1, [Validators.required]),
    detail: new FormControl(null, [Validators.required])
  });
  confirmForm: FormGroup = new FormGroup({
    code: new FormControl(null, [Validators.required])
  });
  selectedIndex = 0;
  disableButton = true;
  buttonText = 'Continuar';
  @ViewChild('sendMoneyStepper') stepper: CdkStepper;

  constructor() {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.setEnableButton();
  }

  setEnableButton() {
    switch (this.selectedIndex) {
      case 0 :
        this.disableButton = this.informationForm.invalid;
        this.informationForm.valueChanges.subscribe(value => {
          this.disableButton = this.informationForm.invalid;
        });
        break;
      case 1:
        this.disableButton = this.amountAndQuotaForm.invalid;
        this.amountAndQuotaForm.valueChanges.subscribe(value => {
          this.disableButton = this.amountAndQuotaForm.invalid;
        });
        break;
      case 2:
        this.disableButton = this.confirmForm.invalid;
        this.confirmForm.valueChanges.subscribe(value => {
          this.disableButton = this.confirmForm.invalid;
        });
        break;
    }
  }

  next() {
    this.selectedIndex++;
    if (this.selectedIndex === 2) {
      this.buttonText = 'Transferir';
    }

    this.stepper.next();
    this.setEnableButton();
  }

  back() {
    this.selectedIndex--;
    this.stepper.previous();
    this.setEnableButton();
  }

}
