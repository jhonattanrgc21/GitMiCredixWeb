import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'first-step-credix-code',
  templateUrl: './first-step-credix-code.component.html',
  styleUrls: ['./first-step-credix-code.component.scss']
})
export class FirstStepCredixCodeComponent implements OnInit {


  @Input() credixCode: FormControl = new FormControl(null, [Validators.required]);


  constructor() {
  }

  ngOnInit(): void {
  }


}
