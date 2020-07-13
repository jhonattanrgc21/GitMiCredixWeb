import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-slider',
  templateUrl: './credix-slider.component.html',
  styleUrls: ['./credix-slider.component.scss']
})
export class CredixSliderComponent implements OnInit {
  @Input() disabled = false;
  @Input() max = 12;
  @Input() min = 1;
  @Input() step = 1;
  @Input() defaultValue = 1;
  @Input() instructions = 'Instrucciones';
  @Input() units = 'Unidades';
  @Input() value = 1;
  @Output() valueChange = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  valueChangeEvent(event) {
    this.value = event;
    this.valueChange.emit(this.value);
  }
}
