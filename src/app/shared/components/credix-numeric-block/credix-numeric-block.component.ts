import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-numeric-block',
  templateUrl: './credix-numeric-block.component.html',
  styleUrls: ['./credix-numeric-block.component.scss']
})
export class CredixNumericBlockComponent implements OnInit, OnChanges {
  @Input() value: number;
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
    if (this.value) {
      this.integerValue = Math.trunc(this.value).toLocaleString('es');
      const valuesArray = (this.value + '').split('.');
      this.decimalValue = valuesArray[1] ? valuesArray[1] : '00';
    }
  }

}
