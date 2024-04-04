import {Component, Input, OnInit} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-amount-summary',
  templateUrl: './credix-amount-summary.component.html',
  styleUrls: ['./credix-amount-summary.component.scss']
})
export class CredixAmountSummaryComponent implements OnInit {

  @Input() label: string;
  @Input() amount: string;
  @Input() prefix: string = "₡";
  constructor() { }

  ngOnInit(): void {
  }

}
