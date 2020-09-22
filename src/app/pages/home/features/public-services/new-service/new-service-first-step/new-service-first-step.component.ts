import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-service-first-step',
  templateUrl: './new-service-first-step.component.html',
  styleUrls: ['./new-service-first-step.component.scss']
})
export class NewServiceFirstStepComponent implements OnInit {
  @Input() consultFormGroup: FormGroup = new FormGroup({
    contract: new FormControl(null, [Validators.required])
  });
  @Input() referenceLabel: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
