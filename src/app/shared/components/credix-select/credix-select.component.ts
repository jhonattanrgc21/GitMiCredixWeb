import {AfterViewInit, Component, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
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

  constructor() {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.queryOptions.changes.subscribe(() => {
      this.options = this.queryOptions.toArray().map(option => ({value: option.value, viewValue: option.viewValue}));
    });
  }

}
