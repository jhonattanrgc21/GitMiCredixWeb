import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  formGroupOne = new FormGroup(
    {name: new FormControl(null, [Validators.required])}
  );
  formGroupTwo = new FormGroup(
    {fullName: new FormControl(null, [Validators.required])}
  );

  constructor() {
  }

  ngOnInit(): void {
  }

}
