import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'thirsty-step-email-registered',
  templateUrl: './thirsty-step-email-registered.component.html',
  styleUrls: ['./thirsty-step-email-registered.component.scss']
})
export class ThirstyStepEmailRegisteredComponent implements OnInit {


  @Input() email: string;

  @Input() emailRegistered: FormControl;

  constructor() { }

  ngOnInit(): void {
    if (this.email !== undefined) {
      this.emailRegistered.setValue(this.email);  
    }
  }

}
