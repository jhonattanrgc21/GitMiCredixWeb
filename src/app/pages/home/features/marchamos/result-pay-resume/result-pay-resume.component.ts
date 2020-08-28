import {Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges} from '@angular/core';
import { MarchamosService } from '../marchamos.service';

@Component({
  selector: 'result-pay-resume',
  templateUrl: './result-pay-resume.component.html',
  styleUrls: ['./result-pay-resume.component.scss']
})
export class ResultPayResumeComponent implements OnInit,OnChanges {


  @Input() resultPay: {messageToPay: string, responseToPay: string, totalMount:number,quotes:number, plateNumber:string, firstCouteToPayIn:string};

  @Input() responseResultPay: boolean;
  @Output() responseResultPayChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges){
    if (changes.responseResultPay && this.responseResultPay) {
     
    }
  }

  doAnotherPay() {
    this.responseResultPayChanged.emit(!this.responseResultPay);
   }

}
