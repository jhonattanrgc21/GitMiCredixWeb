import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'adress-step-component',
  templateUrl: './adress-step.component.html',
  styleUrls: ['./adress-step.component.scss']
})
export class AdressStepComponent implements OnInit {
  @Input() AdressStepFormGroup: FormGroup;

  constructor() { }

  ngOnInit(): void { }
}
