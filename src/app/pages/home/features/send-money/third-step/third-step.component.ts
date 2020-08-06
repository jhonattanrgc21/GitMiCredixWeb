import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-third-step',
  templateUrl: './third-step.component.html',
  styleUrls: ['./third-step.component.scss']
})
export class ThirdStepComponent implements OnInit {
  @Input() codeControl: FormControl = new FormControl(null);

  constructor() {
  }

  ngOnInit(): void {
  }

}
