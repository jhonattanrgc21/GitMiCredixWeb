import {AfterViewInit, Directive, ElementRef} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[credixRow]'
})
export class CredixRowDirective implements AfterViewInit {

  constructor(private el: ElementRef) {
    el.nativeElement.style.padding = '16px 0';
    el.nativeElement.style.margin = '0 16px';
    el.nativeElement.style.borderBottom = '1px solid #E9E9E9';
    el.nativeElement.style.minHeight = '0';
  }

  ngAfterViewInit(): void {
    this.el.nativeElement.firstElementChild.style.paddingLeft = '0';
    this.el.nativeElement.lastElementChild.style.paddingRight = '0';
  }
}
