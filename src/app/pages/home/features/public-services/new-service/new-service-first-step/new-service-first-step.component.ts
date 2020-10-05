import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-service-first-step',
  templateUrl: './new-service-first-step.component.html',
  styleUrls: ['./new-service-first-step.component.scss']
})
export class NewServiceFirstStepComponent implements OnInit {
  @Input() contractControl = new FormControl(null, [Validators.required]);
  @Input() hasReceipts = true;

  constructor() {
  }

  ngOnInit(): void {
  }

}
