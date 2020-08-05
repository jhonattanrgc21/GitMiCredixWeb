import {Component, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-input-password',
  templateUrl: './credix-input-password.component.html',
  styleUrls: ['./credix-input-password.component.scss']
})
export class CredixInputPasswordComponent implements OnInit, OnChanges {
  @Input() label: string;
  @Input() focusLabel: string;
  @Input() tooltipOffsetY: number;
  @Input() tooltipWidth: number;
  @Input() panelClass: string;
  @Input() control: FormControl;
  hide = true;
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
