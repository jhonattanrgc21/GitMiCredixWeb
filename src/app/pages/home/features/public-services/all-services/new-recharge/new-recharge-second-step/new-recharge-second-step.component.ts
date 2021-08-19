import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ConvertStringAmountToNumber} from '../../../../../../../shared/utils';
import {CredixCodeErrorService} from '../../../../../../../core/services/credix-code-error.service';

@Component({
  selector: 'app-new-recharge-second-step',
  templateUrl: './new-recharge-second-step.component.html',
  styleUrls: ['./new-recharge-second-step.component.scss']
})
export class NewRechargeSecondStepComponent implements OnInit, OnChanges {
  @Input() rechargeFormGroup: FormGroup = new FormGroup({
    amount: new FormControl(null, [Validators.required]),
    favorite: new FormControl(null),
  });
  @Input() amounts: { amount: string, id: number }[];
  @Input() phoneNumber: number;
  @Output() saveFavoriteEvent = new EventEmitter<boolean>();
  showInput = false;
  anotherAmount = false;
  amountsAux : { amount: string, id: number }[];

  constructor(private credixCodeErrorService: CredixCodeErrorService) {
  }

  ngOnInit(): void {
    this.amountsAux = this.amounts.concat();
  }

  ngOnChanges(change: SimpleChanges) {
    if ( change.amounts?.currentValue.length > 0 ) {
      if ( !this.compare(change.amounts?.currentValue, change.amounts?.previousValue ) ) {
        this.amountsAux = change.amounts.currentValue.concat();
      }
    }
  }

  compare (a1, a2) {
    var i = a1.length;
    if ( i != a2.length ) return false;
  
    while ( i-- ) {
      if ( a1[i].amount !== a2[i].amount ) return false;
    }
    return true;
  };

  onCheckboxChanged(checked: boolean) {
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
