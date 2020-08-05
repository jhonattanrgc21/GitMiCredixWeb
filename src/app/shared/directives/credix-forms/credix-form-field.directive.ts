import {AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[credixFormField]'
})
export class CredixFormFieldDirective implements AfterViewInit {
  @Input('credixFormField') type: 'password' | 'confirmPassword' | 'text' = 'text';
  @Input() onFocusLabel: string;
  @Input() height: number;
  label: string;
  inputClass = '.mat-input-element';
  labelWrapperClass = '.mat-form-field-label-wrapper';
  labelClass = '.mat-form-field-label';
  fieldFlexClass = '.mat-form-field-flex';
  fieldInfixClass = '.mat-form-field-infix';
  fieldUnderlineClass = '.mat-form-field-underline';
  fieldSuffixClass = '.mat-form-field-suffix';
  fieldRippleClass = '.mat-form-field-ripple';
  errorClass = '.mat-error';
  inputEl: any;

  constructor(private el: ElementRef, private renderer: Renderer2) {

  }

  ngAfterViewInit(): void {
    this.inputEl = this.el.nativeElement.querySelector(this.inputClass);
    this.label = this.el.nativeElement.querySelector(this.labelClass).children[0].innerHTML;

    if (this.height) {
      this.renderer.setStyle(this.el.nativeElement, 'height', `${this.height}px`);
      this.renderer.setStyle(this.el.nativeElement.querySelector(this.fieldFlexClass), 'height', `${this.height}px`);
    }

    this.renderer.setAttribute(this.inputEl, 'style',
      'padding-left: 8px; font-weight: bold; font-size: 16px; height: 24px; vertical-align: sub');

    this.renderer.setAttribute(this.el.nativeElement.querySelector(this.labelClass), 'style',
      'font-size: 16px; color: #3e3e3e; text-align: left; margin-left: 8px; width: 100%; height: 18px');

    this.renderer.setAttribute(this.el.nativeElement.querySelector(this.fieldFlexClass), 'style',
      'padding: 0');

    this.renderer.setAttribute(this.el.nativeElement.querySelector(this.fieldInfixClass), 'style',
      `padding-bottom: 16px; padding-top: 4px; border: 0; height: ${this.height}px`);

    this.renderer.setAttribute(this.el.nativeElement.querySelector(this.fieldUnderlineClass), 'style',
      'background: #C7C7C7');

    if (this.el.nativeElement.classList.contains('mat-form-field-disabled')) {
      this.renderer.setStyle(this.el.nativeElement.querySelector(this.labelClass), 'color', '#D2D2D2', 1);
      this.renderer.setStyle(this.el.nativeElement.querySelector(this.fieldUnderlineClass), 'background', '#D2D2D2', 1);
    }

    if (this.el.nativeElement.querySelector(this.fieldSuffixClass)) {
      this.renderer.setAttribute(this.el.nativeElement.querySelector(this.fieldSuffixClass), 'style',
        `position: absolute; bottom: 16px; right: 8px; padding-bottom: 16px; color: #3e3e3e;`);
    }
  }

  @HostListener('focusin') onFocusIn() {
    if (this.onFocusLabel) {
      this.el.nativeElement.querySelector(this.labelClass).children[0].innerHTML = this.onFocusLabel;
    }

    if (this.type === 'password') {
      this.renderer.setStyle(this.el.nativeElement.querySelector(this.fieldFlexClass), 'background',
        '#ffffff');
      this.renderer.setStyle(this.el.nativeElement.querySelector(this.fieldInfixClass), 'box-shadow',
        this.type === 'password' ? '-5px 4px 7px -4px rgba(0,0,0,0.149), 5px 4px 7px -4px rgba(0,0,0,0.149)' : 'none');
    }

    this.renderer.setStyle(this.el.nativeElement.querySelector(this.fieldInfixClass), 'padding-bottom', '6px', 1);
    this.renderer.setStyle(this.el.nativeElement.querySelector(this.fieldInfixClass), 'padding-top', '0', 1);
    this.renderer.setStyle(this.el.nativeElement.querySelector(this.labelWrapperClass), 'padding-top', '0', 1);
    this.renderer.setStyle(this.el.nativeElement.querySelector(this.labelWrapperClass), 'top',
      this.type === 'password' ? '4px' : '0', 1);
    this.renderer.setStyle(this.el.nativeElement.querySelector(this.inputClass), 'margin-top', `${this.height / 3}px`, 1);

    this.setInvalidStyle();
    this.setErrorStyle();
  }

  @HostListener('focusout') onFocusOut() {
    if (this.onFocusLabel) {
      this.el.nativeElement.querySelector(this.labelClass).children[0].innerHTML = this.inputEl.value ? this.onFocusLabel : this.label;
    }

    if (this.type === 'password') {
      this.renderer.setStyle(this.el.nativeElement.querySelector(this.fieldFlexClass), 'background',
        'none');
      this.renderer.setStyle(this.el.nativeElement.querySelector(this.fieldInfixClass), 'box-shadow', 'none');
    }

    this.renderer.setStyle(this.el.nativeElement.querySelector(this.fieldInfixClass), 'padding-bottom',
      this.inputEl.value ? '6px' : '16px', 1);
    this.renderer.setStyle(this.el.nativeElement.querySelector(this.fieldInfixClass), 'padding-top',
      this.inputEl.value ? '0' : '4px', 1);

    if (this.type !== 'password') {
      this.renderer.setStyle(this.el.nativeElement.querySelector(this.labelWrapperClass), 'top',
        this.inputEl.value ? '0' : '-16px', 1);
    } else {
      this.renderer.setStyle(this.el.nativeElement.querySelector(this.labelWrapperClass), 'top',
        this.inputEl.value ? '4px' : '-12px', 1);
    }

    this.setInvalidStyle();
    this.setErrorStyle();
  }


  @HostListener('keyup')
  inputChanged() {
    this.setInvalidStyle();
    this.setErrorStyle();
  }

  setInvalidStyle() {
    if (this.el.nativeElement.classList.contains('mat-form-field-invalid') && this.type !== 'password') {
      this.renderer.setStyle(this.el.nativeElement.querySelector(this.labelClass), 'color', '#FF4965', 1);
      this.renderer.setStyle(this.el.nativeElement.querySelector(this.fieldRippleClass), 'background-color', '#FF4965', 1);

      if (this.el.nativeElement.querySelector(this.fieldSuffixClass)) {
        this.renderer.setStyle(this.el.nativeElement.querySelector(this.fieldSuffixClass), 'color', '#FF4965', 1);
      }
    } else {
      this.renderer.setStyle(this.el.nativeElement.querySelector(this.labelClass), 'color', '#3e3e3e', 1);
      this.renderer.setStyle(this.el.nativeElement.querySelector(this.fieldRippleClass), 'background-color', '#707070', 1);

      if (this.el.nativeElement.querySelector(this.fieldSuffixClass)) {
        this.renderer.setStyle(this.el.nativeElement.querySelector(this.fieldSuffixClass), 'color', '#3e3e3e', 1);
      }
    }
  }

  setErrorStyle() {
    if (this.el.nativeElement.querySelector(this.errorClass) && this.type !== 'password') {
      this.renderer.setAttribute(this.el.nativeElement.querySelector(this.errorClass), 'style',
        'margin-left: 8px; color: #FF4965');
    }
  }
}
