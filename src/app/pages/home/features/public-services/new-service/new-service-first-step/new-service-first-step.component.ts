import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Keys} from '../../../../../../shared/models/keys';

@Component({
  selector: 'app-new-service-first-step',
  templateUrl: './new-service-first-step.component.html',
  styleUrls: ['./new-service-first-step.component.scss']
})
export class NewServiceFirstStepComponent implements OnInit {
  @Input() contractFormGroup = new FormGroup({
    contractControl: new FormControl(null, [Validators.required]),
    keysControl: new FormControl(null, [Validators.required])
  });
  @Input() hasReceipts = true;
  @Input() keys: Keys[];
  @Input() quantityOfKeys: number;

  constructor() {
  }

  ngOnInit(): void {
    if (this.quantityOfKeys === 1 && this.keys.length === 1) {
      this.contractFormGroup.controls.keysControl.setValue(this.keys[0].keyType);
    }
  }
}
