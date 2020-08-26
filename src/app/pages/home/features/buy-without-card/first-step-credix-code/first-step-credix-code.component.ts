import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'first-step-credix-code',
  templateUrl: './first-step-credix-code.component.html',
  styleUrls: ['./first-step-credix-code.component.scss']
})
export class FirstStepCredixCodeComponent implements OnInit {


  @Input() credixCode: FormControl = new FormControl();

  constructor() { }

  ngOnInit(): void {
  }

}
