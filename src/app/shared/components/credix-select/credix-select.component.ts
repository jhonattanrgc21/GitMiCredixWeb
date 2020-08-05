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
  @ContentChildren(MatOption) queryOptions: QueryList<MatOption>;
  options: any[];

  constructor() {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.setOptions();

    this.queryOptions.changes.subscribe(() => {
      this.setOptions();
    });
  }

  setOptions() {
    this.options = this.queryOptions.toArray().map(option => ({value: option.value, viewValue: option.viewValue}));
  }

}
