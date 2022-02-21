import {AfterViewInit, Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[credixDivider]'
})
export class CredixDividerDirective implements AfterViewInit {

  constructor(private el: ElementRef,
              private renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'width', '100%');
    this.renderer.setStyle(this.el.nativeElement, 'color', '#E9E9E9' );
  }
}
