import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ConvertStringAmountToNumber} from '../../../../../../../shared/utils';
import {CredixCodeErrorService} from '../../../../../../../core/services/credix-code-error.service';

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
  newAmount = false;

  constructor(private credixCodeErrorService: CredixCodeErrorService) {
  }

  ngOnInit(): void {
    this.credixCodeErrorService.credixCodeError$.subscribe(() => {
      this.confirmFormGroup.controls.credixCode.setErrors({invalid: true});
      this.confirmFormGroup.updateValueAndValidity();
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isActive && this.isActive) {
      switch (this.paymentType) {
        case 'E':
          this.confirmFormGroup.controls.amount.setValue(ConvertStringAmountToNumber(this.amount).toString());
          break;
        case 'C':
          this.confirmFormGroup.controls.amount.setValidators([Validators.required]);
          break;
        case 'M':
          this.confirmFormGroup.controls.amount
            .setValidators([Validators.required, Validators.min(ConvertStringAmountToNumber(this.amount))]);
          break;
        case 'N':
          this.confirmFormGroup.controls.amount
            .setValidators([Validators.required, Validators.min(1), Validators.max(ConvertStringAmountToNumber(this.amount))]);
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
    this.newAmount = event.value === 1;
    if (!this.newAmount) {
      this.confirmFormGroup.controls.amount.setValue(ConvertStringAmountToNumber(this.amount).toString());
    }
  }

}
