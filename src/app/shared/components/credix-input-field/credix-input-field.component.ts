import {Component, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-input-field',
  templateUrl: './credix-input-field.component.html',
  styleUrls: ['./credix-input-field.component.scss']
})
export class CredixInputFieldComponent implements OnInit, OnChanges {
  @Input() label: string;
  @Input() focusLabel: string;
  @Input() mask = '';
  @Input() thousandSeparator = '.';
  @Input() errorMessage: string;
  @Input() icon: string;
  @Input() type: 'text' | 'password' = 'text';
  @Input() control: FormControl;
  viewLabel: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.label) {
      this.viewLabel = this.label;
    }
  }

  @HostListener('focusin') onFocusIn() {
    this.viewLabel = this.focusLabel || this.label;
  }

  @HostListener('focusout') onFocusOut() {
    this.viewLabel = this.control.value && this.focusLabel ? this.focusLabel : this.label;
  }

}
