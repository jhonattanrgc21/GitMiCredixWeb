import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TagsService} from '../../../../../core/services/tags.service';
import {Tag} from '../../../../../shared/models/tag';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.scss']
})
export class PaymentSummaryComponent implements OnInit, OnChanges {
  @Input() resultPay: {
    messageToPay: string,
    responseToPay: string,
    totalMount: number,
    quotas: number,
    plateNumber: string,
    firstCouteToPayIn: string
  };
  @Input() responseResultPay: boolean;
  @Output() responseResultPayChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  placaResult: string;
  dateResult: string;
  amountResult: string;
  resumeTitle: string;

  constructor(private tagsService: TagsService) {
  }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Marchamo').tags)
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.responseResultPay && this.responseResultPay) {

    }
  }

  doAnotherPay() {
    this.responseResultPayChanged.emit(!this.responseResultPay);
  }

  getTags(tags: Tag[]) {
    this.placaResult = tags.find(tag => tag.description === 'marchamos.result.placa').value;
    this.dateResult = tags.find(tag => tag.description === 'marchamos.result.fecha').value;
    this.amountResult = tags.find(tag => tag.description === 'marchamos.result.monto').value;
    this.resumeTitle = tags.find(tag => tag.description === 'marchamos.resumen.title').value;

}


}
