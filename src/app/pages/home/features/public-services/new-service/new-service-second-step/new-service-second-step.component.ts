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
    amount: new FormControl(null)
  });
  @Input() reference: string;
  @Input() currencySymbol: string;
  @Input() amount: string;
  @Input() name: string;
  @Input() month: string;
  @Input() expirationDate: Date;
  @Input() receipts: number;
  @Input() paymentType: string;
  @Input() isActive = false;
  @Output() saveFavoriteEvent = new EventEmitter<boolean>();
  showInput = false;
  radioCheck = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isActive && this.isActive) {
      switch (this.paymentType) {
        case 'C':
          this.confirmFormGroup.controls.amount.setValidators([Validators.required]);
          break;
        case 'M':
          this.confirmFormGroup.controls.amount.setValidators([Validators.required, Validators.min(+this.amount)]);
          break;
        case 'N':
          this.confirmFormGroup.controls.amount.setValidators([Validators.required, Validators.min(1), Validators.max(+this.amount)]);
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
    if (event.value === 'totalAmountPending') {
      this.confirmFormGroup.controls.amount.setValue(+this.amount);
    }
  }

}
