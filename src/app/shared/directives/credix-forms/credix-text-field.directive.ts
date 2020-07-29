import {AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[credixTextField]'
})
export class CredixTextFieldDirective implements AfterViewInit {
  @Input() onFocusLabel: string;
  @Input('credixTextField') type: 'password' | 'text' = 'text';
  label: string;
  inputClass = '.mat-input-element';
  labelClass = '.mat-form-field-label';
  iconClass = '.mat-icon';
  fieldFlexClass = '.mat-form-field-flex';
  fieldInfixClass = '.mat-form-field-infix';
  fieldSuffixClass = '.mat-form-field-suffix';
  fieldRippleClass = '.mat-form-field-ripple';
  invalidClass = '.mat-form-field-invalid';
  errorClass = '.mat-error';
  inputEl: any;

  constructor(private el: ElementRef, private renderer: Renderer2) {

  }

  ngAfterViewInit(): void {
    this.setFieldFlex('init');
    this.setFieldInfix('init');
    this.setFieldSuffix('init');
    this.setFieldLabel('init');
    this.setFieldRipple('init');

    if (this.el.nativeElement.querySelector(this.inputClass)) {
      this.inputEl = this.el.nativeElement.querySelector(this.inputClass);
      this.renderer.setAttribute(this.inputEl, 'style', 'margin-left: 8px; font-weight: bold');
    }

    this.label = this.el.nativeElement.querySelector(this.labelClass).children[0].innerHTML;

    if (this.type === 'password') {
      if (this.el.nativeElement.querySelector(this.iconClass)) {
        this.renderer.setAttribute(this.el.nativeElement.querySelector(this.iconClass), 'style',
          'display: inline-block; height: 15px; width: 22px');
      }
    }
  }

  @HostListener('focusin') onFocusIn() {
    this.setFieldFlex('focusIn');
    this.setFieldInfix('focusIn');
    this.setFieldSuffix('focusIn');
    this.setFieldLabel('focusIn');
    this.setFieldRipple('focusIn');

    if (this.onFocusLabel) {
      this.el.nativeElement.querySelector('.mat-form-field-label').children[0].innerHTML = this.onFocusLabel;
    }
  }

  @HostListener('focusout') onFocusOut() {
    this.setFieldInfix('focusOut');
    this.setFieldSuffix('focusOut');
    this.setFieldLabel('focusOut');
    this.setFieldRipple('focusOut');

    if (this.el.nativeElement.querySelector(this.errorClass)) {
      this.renderer.setAttribute(this.el.nativeElement.querySelector(this.errorClass), 'style',
        'margin-left: 8px; margin-top: 4px; color: #FF4965; font-size: 12px');

    }
    this.el.nativeElement.querySelector(this.labelClass).children[0].innerHTML = this.inputEl.value ? this.onFocusLabel : this.label;
  }

  @HostListener('keyup', ['$event'])
  inputChanged(event) {
    this.setFieldRipple('keyUp');
  }

  setFieldFlex(status: 'init' | 'focusIn') {
    const fieldFlex = this.el.nativeElement.querySelector(this.fieldFlexClass);
    switch (status) {
      case 'init':
        this.renderer.setAttribute(fieldFlex, 'style', 'padding-top: 0 !important');
        break;
      case 'focusIn':
        this.renderer.setStyle(fieldFlex, 'background',
          this.type === 'password' ? '#ffffff' : 'transparent');
        break;
      default:
        this.renderer.setAttribute(fieldFlex, 'style', 'padding-top: 0 !important');
        break;
    }
  }

  setFieldInfix(status: 'init' | 'focusIn' | 'focusOut') {
    const fieldInfix = this.el.nativeElement.querySelector(this.fieldInfixClass);

    switch (status) {
      case 'init':
        this.renderer.setAttribute(fieldInfix, 'style', 'padding-bottom: 16px; padding-top: 4px; border: 0 !important;');
        break;
      case 'focusIn':
        this.renderer.setStyle(fieldInfix, 'box-shadow',
          this.type === 'password' ? '0px 5px 10px #00000026' : 'none');
        this.renderer.setStyle(fieldInfix, 'padding-bottom', '6px', 1);
        break;
      case 'focusOut':
        this.renderer.setStyle(fieldInfix, 'box-shadow', 'none');
        this.renderer.setStyle(fieldInfix, 'padding-bottom', this.inputEl.value ? '6px' : '16px', 1);
        break;
      default:
        this.renderer.setAttribute(fieldInfix, 'style', 'padding-bottom: 16px; padding-top: 4px; border: 0 !important;');
        break;
    }
  }

  setFieldSuffix(status: 'init' | 'focusIn' | 'focusOut') {
    const fieldSuffix = this.el.nativeElement.querySelector(this.fieldSuffixClass);

    if (fieldSuffix) {
      switch (status) {
        case 'init':
          this.renderer.setAttribute(fieldSuffix, 'style',
            'position: absolute !important; bottom: 20px; right: 8px; padding-bottom: 16px; color: #3e3e3e;');

          if (this.el.nativeElement.classList.contains('mat-form-field-disabled')) {
            this.renderer.setStyle(fieldSuffix, 'color', '#D2D2D2', 1);
          }
          break;
        case 'focusIn':
          this.renderer.setStyle(fieldSuffix, 'padding-bottom', '6px', 1);

          if (this.el.nativeElement.classList.contains('mat-form-field-invalid') && this.type !== 'password') {
            this.renderer.setStyle(fieldSuffix, 'color', '#FF4965', 1);
          }
          break;
        case 'focusOut':
          this.renderer.setStyle(fieldSuffix, 'padding-bottom', this.inputEl.value ? '6px' : '16px', 1);

          if (this.el.nativeElement.classList.contains('mat-form-field-invalid') && this.type !== 'password') {
            this.renderer.setStyle(fieldSuffix, 'color', '#FF4965', 1);
          }
          break;
        default:
          this.renderer.setAttribute(fieldSuffix, 'style',
            'position: absolute !important; bottom: 20px; right: 8px; padding-bottom: 16px; color: #3e3e3e;');
          break;
      }
    }
  }

  setFieldLabel(status: 'init' | 'focusIn' | 'focusOut') {
    const fieldLabel = this.el.nativeElement.querySelector(this.labelClass);

    switch (status) {
      case 'init':
        this.renderer.setAttribute(fieldLabel, 'style',
          'font-size: 16px; color: #3e3e3e; text-align: left; margin-left: 8px;');

        if (this.el.nativeElement.classList.contains('mat-form-field-disabled')) {
          this.renderer.setStyle(fieldLabel, 'color', '#D2D2D2', 1);
        }
        break;
      case 'focusIn':
        this.renderer.setStyle(fieldLabel, 'font-size', '12px', 1);
        break;
      case 'focusOut':
        if (this.el.nativeElement.classList.contains('mat-form-field-invalid')) {
          this.renderer.setStyle(fieldLabel, 'color', '#FF4965', 1);
        }

        this.renderer.setStyle(fieldLabel, 'font-size', this.inputEl.value ? '12px' : '16px', 1);
        break;
      default:
        this.renderer.setAttribute(fieldLabel, 'style',
          'font-size: 16px; color: #3e3e3e; text-align: left; margin-left: 8px;');
        break;
    }
  }

  setFieldRipple(status: 'init' | 'focusIn' | 'focusOut' | 'keyUp') {
    const fieldRipple = this.el.nativeElement.querySelector(this.fieldRippleClass);

    switch (status) {
      case 'init':
        this.renderer.setAttribute(fieldRipple, 'style', 'background: #C7C7C7');
        break;
      case 'focusIn':
        this.renderer.setStyle(fieldRipple, 'background', '#707070', 1);

        if (this.el.nativeElement.classList.contains('mat-form-field-invalid') && this.type !== 'password') {
          this.renderer.setStyle(fieldRipple, 'background', '#FF4965', 1);
        }
        break;
      case 'focusOut':
        this.renderer.setStyle(fieldRipple, 'background', '#C7C7C7', 1);

        if (this.el.nativeElement.classList.contains('mat-form-field-invalid') && this.type !== 'password') {
          this.renderer.setStyle(fieldRipple, 'background', '#FF4965', 1);
        }
        break;
      case 'keyUp':
        if (this.el.nativeElement.classList.contains('mat-form-field-invalid') && this.type !== 'password') {
          this.renderer.setStyle(fieldRipple, 'background', '#FF4965', 1);
        }
        break;
      default:
        this.renderer.setAttribute(fieldRipple, 'style', 'background: #C7C7C7');
        break;
    }
  }

}
