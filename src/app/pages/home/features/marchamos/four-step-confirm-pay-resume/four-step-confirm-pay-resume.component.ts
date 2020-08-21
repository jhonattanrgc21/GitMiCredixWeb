import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'four-step-confirm-pay-resume',
  templateUrl: './four-step-confirm-pay-resume.component.html',
  styleUrls: ['./four-step-confirm-pay-resume.component.scss']
})
export class FourStepConfirmPayResumeComponent implements OnInit {

  @Input() dataPayResume:{totalMount: any, totalAmountItemsProducts: number, iva: number, commission: number};
  constructor() { }

  ngOnInit(): void {
  }

}
