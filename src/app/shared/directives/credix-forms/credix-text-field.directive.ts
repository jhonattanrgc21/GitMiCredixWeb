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
    this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-flex'),
      'style', 'padding-top: 0 !important');

    this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-infix'),
      'style', 'padding-bottom: 16px !important');

    this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-input-element'),
      'style', 'margin-left: 8px; font-weight: bold');

    this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-suffix'),
      'style', 'position: absolute !important; bottom: 20px; right: 8px; padding-bottom: 16px;');

    this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-underline'),
      'style', 'background:#C7C7C7');

    this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-label'),
      'style', 'font-size: 16px; color: #3e3e3e; text-align: left;');

    this.label = this.el.nativeElement.querySelector('.mat-form-field-label').children[0].innerHTML;

    if (this.el.nativeElement.classList.contains('mat-form-field-disabled')) {
      this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-label'),
        'style', 'color: #D2D2D2');

      this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-suffix'),
        'style', 'color:#D2D2D2');
    }
  }

  @HostListener('focusin') onFocusIn() {
    this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-ripple'),
      'style', 'background:#707070');

    this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-label'),
      'style', 'font-size: 12px; color: #3e3e3e; text-align: left; margin-top: 8px');

    if (this.onFocusLabel) {
      this.el.nativeElement.querySelector('.mat-form-field-label').children[0].innerHTML = this.onFocusLabel;
    }

    if (this.el.nativeElement.classList.contains('mat-form-field-invalid') && this.type !== 'password') {
      this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-ripple'),
        'style', 'background: #FF4965');

      this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-suffix'),
        'style', 'color:#FF4965');
    }

    if (this.type === 'password') {
      this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-flex'),
        'style', 'padding-top: 0 !important; background: #ffffff');

      this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-infix'),
        'style', 'padding-bottom: 16px !important; box-shadow: 0px 5px 10px #00000026;');
    }
  }

  @HostListener('focusout') onFocusOut() {
    if (this.el.nativeElement.querySelector('.mat-error')) {
      this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-error'),
        'style', 'margin-left: 8px; color: #FF4965; font-size: 12px');

      this.renderer.removeAttribute(this.el.nativeElement.querySelector('.mat-form-field-ripple'),
        'style');

      this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-label'),
        'style', 'font-size: 16px; color: #3e3e3e; text-align: left');

      this.el.nativeElement.querySelector('.mat-form-field-label').children[0].innerHTML = this.label;

      if (this.el.nativeElement.classList.contains('mat-form-field-invalid') && this.type !== 'password') {
        this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-ripple'),
          'style', 'background:#FF4965');

        this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-label'),
          'style', 'color: #FF4965;');

        this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-suffix'),
          'style', 'color:#FF4965');
      }
    }

    if (this.type === 'password') {
      this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-flex'),
        'style', 'padding-top: 0 !important;');

      this.renderer.setAttribute(this.el.nativeElement.querySelector('.mat-form-field-infix'),
        'style', 'padding-bottom: 16px !important;');
    }
  }

}
