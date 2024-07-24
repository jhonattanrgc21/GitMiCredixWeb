import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ConvertStringAmountToNumber} from '../../utils';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-numeric-block',
  templateUrl: './credix-numeric-block.component.html',
  styleUrls: ['./credix-numeric-block.component.scss']
})
export class CredixNumericBlockComponent implements OnInit, OnChanges {
  @Input() value: number | string = 0;
  @Input() prefix = '';
  @Input() fontSize = 16;
  @Input() fontWeight: 'normal' | 'bold' = 'normal';
  @Input() type: string = '';
  @Input() disabled = false;
  integerValue: string;
  decimalValue: string;
  sign = '+';

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value && this.value != null) {
      let valueToConvert = this.value;

      if (typeof this.value === 'string') {
        valueToConvert = ConvertStringAmountToNumber(this.value);
      }

      this.sign = valueToConvert >= 0 ? '+' : '-';
      this.integerValue = Math.trunc(Number(valueToConvert)).toLocaleString('es');
      const decimalPart = (valueToConvert.toString()).split('.')[1];

      if ( this.type !== 'percentage' ) {
        this.decimalValue = decimalPart ?
          (decimalPart.substring(0, 2).length === 1 ? decimalPart.substring(0, 2) + '0' : decimalPart.substring(0, 2)) : '00';
      } else {
        this.decimalValue = decimalPart;
      }
    }
  }

}
