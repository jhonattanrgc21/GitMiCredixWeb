import {AfterViewInit, Directive, ElementRef} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[credixHeaderRow]'
})
export class CredixHeaderRowDirective implements AfterViewInit {

  constructor(private el: ElementRef) {
    el.nativeElement.style.backgroundColor = '#F4F4F4';
    el.nativeElement.style.borderBottom = '2px solid #E9E9E9';
    el.nativeElement.style.padding = '8px 16px';
    el.nativeElement.style.minHeight = '0';
  }

  ngAfterViewInit(): void {
    this.el.nativeElement.firstElementChild.style.paddingLeft = '0';
    this.el.nativeElement.lastElementChild.style.paddingRight = '0';
    this.el.nativeElement.style.top = '-16px';
  }
}
