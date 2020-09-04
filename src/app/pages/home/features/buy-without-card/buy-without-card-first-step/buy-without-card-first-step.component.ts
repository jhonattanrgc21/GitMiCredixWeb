import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-buy-without-card-first-step',
  templateUrl: './buy-without-card-first-step.component.html',
  styleUrls: ['./buy-without-card-first-step.component.scss']
})
export class BuyWithoutCardFirstStepComponent implements OnInit {
  @Input() credixCode: FormControl = new FormControl(null, [Validators.required]);

  constructor() {
  }

  ngOnInit(): void {
  }


}
