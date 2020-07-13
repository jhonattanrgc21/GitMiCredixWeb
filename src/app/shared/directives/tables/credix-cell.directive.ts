import {Directive, ElementRef} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[credixCell]'
})
export class CredixCellDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.margin = '0 16px';
    el.nativeElement.style.fontSize = '16px';
    el.nativeElement.style.display = 'inline';
    el.nativeElement.style.whiteSpace = 'nowrap';
    el.nativeElement.style.overflow = 'hidden';
    el.nativeElement.style.textOverflow = 'ellipsis';
  }

}
