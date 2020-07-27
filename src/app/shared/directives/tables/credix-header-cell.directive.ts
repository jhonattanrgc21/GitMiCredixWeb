import {AfterViewInit, Directive, ElementRef} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[credixHeaderCell]'
})
export class CredixHeaderCellDirective implements AfterViewInit {

  constructor(private el: ElementRef) {
    el.nativeElement.style.color = '#696D6F';
    el.nativeElement.style.fontSize = '14px';
    el.nativeElement.style.margin = '0 16px';
    el.nativeElement.style.justifyContent = 'center';
  }

  ngAfterViewInit(): void {
  }

}
