import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-numeric-block',
  templateUrl: './credix-numeric-block.component.html',
  styleUrls: ['./credix-numeric-block.component.scss']
})
export class CredixNumericBlockComponent implements OnInit, OnChanges {
  @Input() value: number | string;
  @Input() prefix = '';
  @Input() fontSize = 16;
  @Input() fontWeight: 'normal' | 'bold' = 'normal';
  integerValue: string;
  decimalValue: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value) {
      if (typeof this.value === 'string') {
        this.integerValue = this.value.split(',')[0];
        this.decimalValue = this.value.split(',')[1] ? this.value.split(',')[1] : '00';
      } else {
        this.integerValue = Math.trunc(this.value).toLocaleString('es');
        const valuesArray = (this.value + '').split('.');
        this.decimalValue = valuesArray[1] ? valuesArray[1] : '00';
      }
    }
  }

}
