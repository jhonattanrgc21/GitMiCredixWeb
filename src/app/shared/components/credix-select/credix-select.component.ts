import {AfterViewInit, Component, ContentChildren, ElementRef, Input, OnInit, QueryList, Renderer2} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatOption} from '@angular/material/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-select',
  templateUrl: './credix-select.component.html',
  styleUrls: ['./credix-select.component.scss']
})
export class CredixSelectComponent implements OnInit, AfterViewInit {
  @Input() control: FormControl;
  @Input() label: string;
  @Input() panelClass = '';
  @Input() height = 38;
  @ContentChildren(MatOption) queryOptions: QueryList<MatOption>;
  options: any[];

  constructor(private el: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.queryOptions.changes.subscribe(() => {
      this.options = this.queryOptions.toArray().map(option => ({value: option.value, viewValue: option.viewValue}));
    });

    this.renderer.setStyle(this.el.nativeElement.querySelector('.mat-form-field'), 'height', `${this.height}px`);
  }

}
