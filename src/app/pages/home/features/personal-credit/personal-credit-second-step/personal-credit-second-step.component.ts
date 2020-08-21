import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-personal-credit-second-step',
  templateUrl: './personal-credit-second-step.component.html',
  styleUrls: ['./personal-credit-second-step.component.scss']
})
export class PersonalCreditSecondStepComponent implements OnInit {
  @Input() accountControl: FormControl = new FormControl(null);
  radioButtonSelected = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  radioButtonChanged(event) {
    this.radioButtonSelected = event.value;

    if (+this.radioButtonSelected === 1) {
      this.accountControl.setValue(null);
    }

    if (+this.radioButtonSelected === 2) {
      this.accountControl.setValue(0);
    }
  }

}
