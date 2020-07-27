import {Component, Input, OnInit} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-gauge',
  templateUrl: './credix-gauge.component.html',
  styleUrls: ['./credix-gauge.component.scss']
})
export class CredixGaugeComponent implements OnInit {
  @Input() min = 0;
  @Input() max = 1000000;
  @Input() value = 0;
  @Input() prefix = '';
  @Input() sufix = '';
  @Input() label = '';

  constructor() {
  }

  ngOnInit(): void {
  }

}
