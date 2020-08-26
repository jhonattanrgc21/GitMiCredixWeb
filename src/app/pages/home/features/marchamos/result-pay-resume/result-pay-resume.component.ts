import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'result-pay-resume',
  templateUrl: './result-pay-resume.component.html',
  styleUrls: ['./result-pay-resume.component.scss']
})
export class ResultPayResumeComponent implements OnInit {


  @Input() resultPay: { messageToPay: string, responseToPay: string, titleToPay: string };
  @Input() dataPay: { totalMount: any, value: number, plateNumber: string, firstCouteToPayIn: string };

  @Input() responseResultPay: boolean;
  @Output() responseResultPayChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.responseResultPay);
  }

  doAnotherPay() {
    this.responseResultPayChanged.emit(!this.responseResultPay);
  }
}
