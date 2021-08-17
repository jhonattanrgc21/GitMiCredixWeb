import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ConvertStringAmountToNumber} from '../../../../../../../shared/utils';
import {CredixCodeErrorService} from '../../../../../../../core/services/credix-code-error.service';

@Component({
  selector: 'app-new-recharge-second-step',
  templateUrl: './new-recharge-second-step.component.html',
  styleUrls: ['./new-recharge-second-step.component.scss']
})
export class NewRechargeSecondStepComponent implements OnInit {
  @Input() rechargeFormGroup: FormGroup = new FormGroup({
    amount: new FormControl(null, [Validators.required]),
    favorite: new FormControl(null),
  });
  @Input() amounts: { amount: string, id: number }[];
  @Input() phoneNumber: number;
  @Output() saveFavoriteEvent = new EventEmitter<boolean>();
  showInput = false;
  anotherAmount = false;

  constructor(private credixCodeErrorService: CredixCodeErrorService) {
  }

  ngOnInit(): void {
    /*this.credixCodeErrorService.credixCodeError$.subscribe(() => {
      this.rechargeFormGroup.controls.credixCode.setErrors({invalid: true});
      this.rechargeFormGroup.updateValueAndValidity();
    });*/
  }

  onCheckboxChanged(checked: boolean) {

    console.log("onChecxboxChanged");

    this.showInput = checked;
    this.saveFavoriteEvent.emit(checked);
    this.rechargeFormGroup.controls.favorite.reset();
    if (this.saveFavoriteEvent) {
      this.rechargeFormGroup.controls.favorite.setValidators([Validators.required]);
    } else {
      this.rechargeFormGroup.controls.favorite.clearValidators();
    }
    this.rechargeFormGroup.controls.favorite.updateValueAndValidity();
  }

  onAmountChanged(value) {

    console.log("onAmountChanged");

    if (value !== 'Otro') {
      this.anotherAmount = false;
      this.rechargeFormGroup.controls.amount.setValidators([Validators.required]);
      this.rechargeFormGroup.controls.amount.setValue(ConvertStringAmountToNumber(value).toString());
    } else {
      this.rechargeFormGroup.controls.amount.reset();
      this.rechargeFormGroup.controls.amount.setValidators([Validators.required,
        Validators.min(ConvertStringAmountToNumber(this.amounts[0].amount))]);
      this.anotherAmount = true;
    }
    this.rechargeFormGroup.controls.amount.updateValueAndValidity();
  }

}
