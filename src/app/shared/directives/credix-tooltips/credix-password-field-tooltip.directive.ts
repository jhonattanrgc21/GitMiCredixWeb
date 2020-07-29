import {ComponentRef, Directive, ElementRef, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {Overlay, OverlayPositionBuilder, OverlayRef} from '@angular/cdk/overlay';
import {CredixPasswordFieldTooltipComponent} from './credix-password-field-tooltip/credix-password-field-tooltip.component';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[credixPasswordFieldTooltip]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: CredixPasswordFieldTooltipDirective,
    multi: true
  }]
})
export class CredixPasswordFieldTooltipDirective implements OnInit, OnChanges, OnDestroy, Validator {

  @Input('credixPasswordFieldTooltip') errors: ValidationErrors | null;
  private overlayRef: OverlayRef;
  private tooltipRef: ComponentRef<CredixPasswordFieldTooltipComponent>;

  constructor(private overlay: Overlay, private overlayPositionBuilder: OverlayPositionBuilder,
              private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([{
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        offsetY: -22,
        offsetX: -8,
      }]);

    this.overlayRef = this.overlay.create({positionStrategy});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
      this.show();
    }
  }

  @HostListener('focusin')
  focusIn() {
    if (!this.overlayRef.hasAttached()) {
      this.show();
    }
  }

  @HostListener('focusout')
  focusOut() {
    this.overlayRef.detach();
  }

  show() {
    this.tooltipRef = this.overlayRef.attach(new ComponentPortal(CredixPasswordFieldTooltipComponent));
    // @ts-ignore
    this.tooltipRef.instance.errors = this.errors;
  }

  ngOnDestroy(): void {
    this.overlayRef.detach();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    let validationObject = null;

    if (control.value && control.value.length < 8) {
      validationObject = {...validationObject, minLength: true};
    }

    if (control.value && !(new RegExp('[A-Z]').test(control.value))) {
      validationObject = {...validationObject, upperCaseLetter: true};
    }

    if (control.value && !(new RegExp('[a-z]').test(control.value))) {
      validationObject = {...validationObject, lowerCaseLetter: true};
    }

    if (control.value && !(new RegExp('[0-9]').test(control.value))) {
      validationObject = {...validationObject, numericDigit: true};
    }

    return validationObject;
  }
}
