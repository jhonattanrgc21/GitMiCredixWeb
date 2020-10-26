import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-service-second-step',
  templateUrl: './new-service-second-step.component.html',
  styleUrls: ['./new-service-second-step.component.scss']
})
export class NewServiceSecondStepComponent implements OnInit, OnChanges {
  @Input() confirmFormGroup: FormGroup = new FormGroup({
    credixCode: new FormControl(null, [Validators.required]),
    favorite: new FormControl(null),
    amount: new FormControl(null, [Validators.required])
  });
  @Input() reference = '';
  @Input() currencySymbol = '';
  @Input() amount = '0.00';
  @Input() name = '';
  @Input() month = '';
  @Input() expirationDate: Date;
  @Input() receipts = 0;
  @Input() paymentType: string;
  @Input() isActive = false;
  @Output() saveFavoriteEvent = new EventEmitter<boolean>();
  showInput = false;
  radioCheck = false;
  selectPayment = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isActive && this.isActive) {
      switch (this.paymentType) {
        case 'E':
          this.confirmFormGroup.controls.amount.setValue(this.amount);
          break;
        case 'C':
          this.confirmFormGroup.controls.amount.setValidators([Validators.required]);
          break;
        case 'M':
          this.confirmFormGroup.controls.amount.setValidators([Validators.required, Validators.min(+this.amount)]);
          break;
        case 'N':
          this.confirmFormGroup.controls.amount
            .setValidators([Validators.required, Validators.min(1), Validators.max(+this.amount)]);
          break;
      }
    }
  }

  onCheckboxChanged(checked: boolean) {
    this.showInput = checked;
    this.saveFavoriteEvent.emit(checked);
    this.confirmFormGroup.controls.favorite.reset();

    if (this.showInput) {
      this.confirmFormGroup.controls.favorite.setValidators([Validators.required]);
    } else {
      this.confirmFormGroup.controls.favorite.clearValidators();
    }

    this.confirmFormGroup.controls.favorite.updateValueAndValidity();
  }

  onSelectRadioButtons(event) {
    this.selectPayment = event.value;
    if (event.value === 'totalAmountPending') {
      this.confirmFormGroup.controls.amount.setValue(this.amount);
    }
  }

}
