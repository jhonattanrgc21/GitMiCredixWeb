import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss']
})
export class SecondStepComponent implements OnInit {
  @Input() amountToSendControl: FormControl = new FormControl(null);
  @Input() quotasControl: FormControl = new FormControl(null);
  @Input() detailsControl: FormControl = new FormControl(null);

  constructor() {
  }

  ngOnInit(): void {
  }

}
