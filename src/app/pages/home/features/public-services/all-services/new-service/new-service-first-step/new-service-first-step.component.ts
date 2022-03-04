import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Keys} from '../../../../../../../shared/models/keys';

@Component({
  selector: 'app-new-service-first-step',
  templateUrl: './new-service-first-step.component.html',
  styleUrls: ['./new-service-first-step.component.scss']
})
export class NewServiceFirstStepComponent implements OnInit, OnChanges {
  @Input() contractFormGroup = new FormGroup({
    contractControl: new FormControl(null, [Validators.required]),
    keysControl: new FormControl(null, [Validators.required])
  });
  @Input() hasReceipts = true;
  @Input() message: string;
  @Input() keys: Keys[];
  @Input() quantityOfKeys: number;
  label = 'contrato';

  constructor() {
  }

  ngOnInit(): void {
    this.getLabel();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.keys) {
      if (this.keys?.length === 1) {
        this.contractFormGroup.controls.keysControl.setValue(this.keys[0].keyType);
        this.label = this.keys[0].description;
        console.log("keysControl: ", this.contractFormGroup.controls.keysControl.value);
      }
    }
  }

  getLabel() {
    this.contractFormGroup.controls.keysControl.valueChanges.subscribe(value =>
      this.label = this.keys.find(key => key.keyType === value).description);
  }
}
