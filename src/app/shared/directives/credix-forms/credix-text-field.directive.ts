import {AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[credixTextField]'
})
export class CredixTextFieldDirective implements AfterViewInit {
  @Input() onFocusLabel: string;
  @Input('credixTextField') type: 'password' | 'text' = 'text';
  label: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {

  }

  ngAfterViewInit(): void {
    this.setFieldFlex('init');
    this.setFieldInfix('init');
    this.setFieldSuffix('init');
    this.setFieldLabel('init');

    this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-underline'),
      'style', 'background:#C7C7C7');

    if (this.el.nativeElement.querySelector('.mat-input-element')) {
      this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-input-element'),
        'style', 'margin-left: 8px; font-weight: bold');
    }

    this.label = this.el.nativeElement.querySelector('.mat-form-field-label').children[0].innerHTML;
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

    if (this.type === 'password') {
      if (this.el.nativeElement.querySelector('.mat-icon')) {
        this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-icon'),
          'style', 'display: inline-block; height: 15px; width: 22px');
      }
    }
  }

  @HostListener('focusout') onFocusOut() {
    this.setFieldFlex('focusOut');
    this.setFieldInfix('focusOut');
    this.setFieldSuffix('focusOut');
    this.setFieldLabel('focusOut');
    this.setFieldRipple('focusOut');

    if (this.el.nativeElement.querySelector('.mat-error')) {
      this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-error'),
        'style', 'margin-left: 8px; color: #FF4965; font-size: 12px');
      this.el.nativeElement.querySelector('.mat-form-field-label').children[0].innerHTML = this.label;
    }

  }

  @HostListener('keyup', ['$event'])
  inputChanged(event) {
    this.setFieldSuffix('keyUp');
    this.setFieldLabel('keyUp');
    this.setFieldRipple('keyUp');

    if (this.onFocusLabel) {
      this.el.nativeElement.querySelector('.mat-form-field-label').children[0].innerHTML = this.onFocusLabel;
    }

    if (this.el.nativeElement.querySelector('.mat-error')) {
      this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-error'),
        'style', 'margin-left: 8px; color: #FF4965; font-size: 12px');
    }
  }

  setFieldFlex(status: 'init' | 'focusIn' | 'focusOut' | 'keyUp') {
    switch (status) {
      case 'init':
        this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-flex'),
          'style', 'padding-top: 0 !important');
        break;
      case 'focusIn':
        if (this.type === 'password') {
          this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-flex'),
            'style', 'padding-top: 0 !important; background: #ffffff');
        }
        break;
      case 'focusOut':
        if (this.type === 'password') {
          this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-flex'),
            'style', 'padding-top: 0 !important;');
        }
        break;
      default:
        this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-infix'),
          'style', 'padding-bottom: 16px !important');
        break;
    }
  }

  setFieldInfix(status: 'init' | 'focusIn' | 'focusOut' | 'keyUp') {
    switch (status) {
      case 'init':
        this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-infix'),
          'style', 'padding-bottom: 16px !important; border: 0;');
        break;
      case 'focusIn':
        if (this.type === 'password') {
          this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-infix'),
            'style', 'padding-bottom: 16px !important; box-shadow: 0px 5px 10px #00000026; border: 0;');
        }
        break;
      case 'focusOut':
        if (this.type === 'password') {
          this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-infix'),
            'style', 'padding-bottom: 16px !important; border: 0;');
        }
        break;
      default:
        this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-infix'),
          'style', 'padding-bottom: 16px !important; border: 0;');
        break;
    }
  }

  setFieldSuffix(status: 'init' | 'focusIn' | 'focusOut' | 'keyUp') {
    if (this.el.nativeElement.querySelector('.mat-form-field-suffix')) {
      switch (status) {
        case 'init':
          this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-suffix'),
            'style', 'position: absolute !important; bottom: 20px; right: 8px; padding-bottom: 16px; color: #3e3e3e;');

          if (this.el.nativeElement.classList.contains('mat-form-field-disabled')) {
            this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-suffix'),
              'style', 'color:#D2D2D2');
          }
          break;
        case 'focusIn':
          this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-suffix'),
            'style', 'position: absolute !important; bottom: 20px; right: 8px; padding-bottom: 16px; color: #3e3e3e;');

          if (this.el.nativeElement.classList.contains('mat-form-field-invalid') && this.type !== 'password') {
            this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-suffix'),
              'style', 'color:#FF4965');
          }
          break;
        case 'focusOut':
          this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-suffix'),
            'style', 'position: absolute !important; bottom: 20px; right: 8px; padding-bottom: 16px; color: #3e3e3e;');

          if (this.el.nativeElement.classList.contains('mat-form-field-invalid') && this.type !== 'password') {
            this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-suffix'),
              'style', 'color:#FF4965');
          }
          break;
        case 'keyUp':
          this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-suffix'),
            'style', 'position: absolute !important; bottom: 20px; right: 8px; padding-bottom: 16px; color: #3e3e3e;');

          if (this.el.nativeElement.classList.contains('mat-form-field-invalid') && this.type !== 'password') {
            this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-suffix'),
              'style', 'color:#FF4965');
          }
          break;
        default:
          this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-suffix'),
            'style', 'position: absolute !important; bottom: 20px; right: 8px; padding-bottom: 16px; color: #3e3e3e;');
          break;
      }
    }
  }

  setFieldLabel(status: 'init' | 'focusIn' | 'focusOut' | 'keyUp') {
    switch (status) {
      case 'init':
        this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-label'),
          'style', 'font-size: 16px; color: #3e3e3e; text-align: left; margin-left: 8px;');

        if (this.el.nativeElement.classList.contains('mat-form-field-disabled')) {
          this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-label'),
            'style', 'color: #D2D2D2');
        }
        break;
      case 'focusIn':
        this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-label'),
          'style', 'font-size: 12px; color: #3e3e3e; text-align: left; margin-top: 8px; margin-left: 8px;');

        if (this.el.nativeElement.classList.contains('mat-form-field-invalid') && this.type !== 'password') {
          this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-label'),
            'style', 'font-size: 12px; color: #FF4965; text-align: left; margin-top: 8px; margin-left: 8px;');
        }
        break;
      case 'focusOut':
        if (this.el.nativeElement.querySelector('.mat-error')) {
          this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-label'),
            'style', 'font-size: 16px; color: #3e3e3e; text-align: left; margin-left: 8px;');

          if (this.el.nativeElement.classList.contains('mat-form-field-invalid') && this.type !== 'password') {
            this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-label'),
              'style', 'font-size: 16px; color: #FF4965; text-align: left; margin-left: 8px;');
          }
        }
        break;
      case 'keyUp':
        this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-label'),
          'style', 'font-size: 12px; color: #3e3e3e; text-align: left; margin-top: 8px; margin-left: 8px;');

        if (this.el.nativeElement.querySelector('.mat-error')) {
          this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-label'),
            'style', 'font-size: 16px; color: #3e3e3e; text-align: left; margin-left: 8px;');

          if (this.el.nativeElement.classList.contains('mat-form-field-invalid') && this.type !== 'password') {
            this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-label'),
              'style', 'font-size: 12px; color: #FF4965; text-align: left; margin-top: 8px; margin-left: 8px;');
          }
        }
        break;
      default:
        this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-label'),
          'style', 'font-size: 16px; color: #3e3e3e; text-align: left; margin-left: 8px;');
        break;
    }
  }

  setFieldRipple(status: 'init' | 'focusIn' | 'focusOut' | 'keyUp') {
    switch (status) {
      case 'focusIn':
        this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-ripple'),
          'style', 'background:#707070');

        if (this.el.nativeElement.classList.contains('mat-form-field-invalid') && this.type !== 'password') {
          this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-ripple'),
            'style', 'background: #FF4965');
        }
        break;
      case 'focusOut':
        this.renderer.removeAttribute(this.el.nativeElement.querySelector('.mat-form-field-ripple'),
          'style');

        if (this.el.nativeElement.classList.contains('mat-form-field-invalid') && this.type !== 'password') {
          this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-ripple'),
            'style', 'background:#FF4965');
        }
        break;
      case 'keyUp':
        this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-ripple'),
          'style', 'background:#707070');

        if (this.el.nativeElement.classList.contains('mat-form-field-invalid') && this.type !== 'password') {
          this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-ripple'),
            'style', 'background: #FF4965');
        }
        break;
      default:
        this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-ripple'),
          'style', 'background:#707070');
        break;
    }
  }

}
