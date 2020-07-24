import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-paginator',
  templateUrl: './credix-paginator.component.html',
  styleUrls: ['./credix-paginator.component.scss']
})
export class CredixPaginatorComponent implements OnInit {
  @Output() pageChange = new EventEmitter<number>();
  @Input() maxSize = 10;
  @Input() autoHide = true;
  @Input() previousLabel = '';
  @Input() nextLabel = '';

  constructor() {
  }

  ngOnInit(): void {
  }

}
