import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-service-second-step',
  templateUrl: './new-service-second-step.component.html',
  styleUrls: ['./new-service-second-step.component.scss']
})
export class NewServiceSecondStepComponent implements OnInit {
  @Input() confirmFormGroup: FormGroup = new FormGroup({
    credixCode: new FormControl(null, [Validators.required]),
    favorite: new FormControl(null)
  });
  @Input() reference: string;
  @Input() currencySymbol: string;
  @Input() amount: string;
  @Input() name: string;
  @Input() month: string;
  @Input() expirationDate: Date;
  @Input() receipts: number;
  @Output() saveFavoriteEvent = new EventEmitter<boolean>();
  showInput = false;

  constructor() {
  }

  ngOnInit(): void {
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

}
