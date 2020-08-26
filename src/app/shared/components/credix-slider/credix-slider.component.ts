import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatSlider} from '@angular/material/slider';

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
  @Input() displayValue;
  @Input() displayMin;
  @Input() displayMax;
  @Output() inputChange = new EventEmitter<number>();
  @Output() valueChange = new EventEmitter<number>();
  @ViewChild(MatSlider) slider: MatSlider;
  @ViewChild('minWrapper', {read: ElementRef, static: true}) minWrapper: ElementRef;
  @ViewChild('maxWrapper', {read: ElementRef, static: true}) maxWrapper: ElementRef;
  showMinWrapper = false;
  showMaxWrapper = false;

  constructor() {
  }

  ngOnInit(): void {
    this.showMinWrapper = !!this.minWrapper.nativeElement.innerHTML;
    this.showMaxWrapper = !!this.maxWrapper.nativeElement.innerHTML;
  }

  valueChangeEvent(event) {
    this.value = event.value;
    this.valueChange.emit(this.value);
  }

  inputChangeEvent(event) {
    this.value = event.value;
    this.inputChange.emit(this.value);
  }

}
