import {ComponentRef, Directive, ElementRef, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {Overlay, OverlayPositionBuilder, OverlayRef} from '@angular/cdk/overlay';
import {CredixPasswordFieldTooltipComponent} from './credix-password-field-tooltip/credix-password-field-tooltip.component';
import {FormControl} from '@angular/forms';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[credixPasswordFieldTooltip]'
})
export class CredixPasswordFieldTooltipDirective implements OnInit, OnDestroy {
  @Input('credixPasswordFieldTooltip') passwordControl: FormControl;
  @Input() panelClass: string;
  @Input() tooltipWidth: number;
  @Input() tooltipOffsetY: number;
  @Input () tooltipType : 'password' | 'pin'  = 'password';
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
        offsetY: this.tooltipOffsetY ? -1 * this.tooltipOffsetY : -12,
        panelClass: ['credix-tooltip-panel', this.panelClass]
      }]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      width: this.tooltipWidth ? `${this.tooltipWidth}px` : this.elementRef.nativeElement.offsetWidth
    });
    this.passwordControl.valueChanges.subscribe(value => {
      this.validate(value);
      if (this.overlayRef && this.overlayRef.hasAttached()) {
        this.overlayRef.detach();
        this.show();
      }
    });
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

  ngOnDestroy(): void {
    this.overlayRef.detach();
  }

  show() {
    this.tooltipRef = this.overlayRef.attach(new ComponentPortal(CredixPasswordFieldTooltipComponent));
    // @ts-ignore

    this.tooltipRef.instance.tooltipType = this.tooltipType;
    //console.log(this.tooltipRef.instance.toolType);
    this.tooltipRef.instance.errors = this.passwordControl.errors;

  }

  validate(value) {
    let validationObject = {...this.passwordControl.errors};

    if(this.tooltipType === 'password'){
      if (value && value.length < 8) {
        validationObject = {...validationObject, minLength: true};
      }

      if (value && !(new RegExp('[A-Z]').test(value))) {
        validationObject = {...validationObject, upperCaseLetter: true};
      }

      if (value && !(new RegExp('[a-z]').test(value))) {
        validationObject = {...validationObject, lowerCaseLetter: true};
      }

      if (value && !(new RegExp('[0-9]').test(value))) {
        validationObject = {...validationObject, numericDigit: true};
      }
    }else{
      if (value && value.length < 4) {
        validationObject = {...validationObject, minLength: true};
      }

      if (value && (new RegExp('[A-Z]').test(value))) {
        validationObject = {...validationObject, upperCaseLetter: true};
      }

      if (value && (new RegExp('[a-z]').test(value))) {
        validationObject = {...validationObject, lowerCaseLetter: true};
      }
    }

    if (Object.keys(validationObject).length === 0) {
      this.passwordControl.setErrors(null);
    } else {
      this.passwordControl.setErrors(validationObject);
    }

  }
}
