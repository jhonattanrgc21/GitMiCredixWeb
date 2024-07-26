import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'personal-info-step-component',
  templateUrl: './personal-info-step.component.html',
  styleUrls: ['./personal-info-step.component.scss']
})
export class PersonalInfoStepComponent implements OnInit {
  @Input() personalInfoFormGroup: FormGroup;

  constructor() { }

  ngOnInit(): void { }
}
