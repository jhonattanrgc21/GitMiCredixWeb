import {Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[credixCard]'
})
export class CredixCardDirective {

  constructor(el: ElementRef, private renderer: Renderer2) {
    this.renderer.removeClass(el.nativeElement, 'mat-card');
    el.nativeElement.style.boxSizing = 'border-box';
    el.nativeElement.style.padding = '16px';
    el.nativeElement.style.background = '#ffffff';
    el.nativeElement.style.borderRadius = '8px';
    el.nativeElement.style.boxShadow = 'none';
    el.nativeElement.style.display = 'block';
  }

}
