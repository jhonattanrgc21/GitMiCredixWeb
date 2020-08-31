import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {SendMoneyService} from '../send-money.service';
import {ModalService} from '../../../../../core/services/modal.service';
import {ModalDetailsComponent} from './modal-details/modal-details.component';

@Component({
  selector: 'app-send-money-second-step',
  templateUrl: './send-money-second-step.component.html',
  styleUrls: ['./send-money-second-step.component.scss']
})
export class SendMoneySecondStepComponent implements OnInit {
  @Input() amountToSendControl: FormControl = new FormControl(null);
  @Input() quotasControl: FormControl = new FormControl(null);
  @Input() detailsControl: FormControl = new FormControl(null);
  @Input() currencyCode = '';
  @Output() commissionRateEmitEvent = new EventEmitter();
  @Output() commissionEmitEvent = new EventEmitter();
  @Output() totalEmitEvent = new EventEmitter();
  listQuotas = [];
  quotaAmountView = 0;
  maxQuota = 0;
  minQuota = 0;
  total = 0;
  stepQuota = 0;
  commission = 0;
  quotaDetail = {commissionRate: 0, quota: 0, description: '', id: 1};

  constructor(private sendMoneyService: SendMoneyService, private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.amountToSendControl.valueChanges.subscribe(value => {
      this.computeQuotaAmount(value, this.quotasControl.value);
      this.change();
    });

    this.quotasControl.valueChanges.subscribe(value => {
      this.computeQuotaAmount(this.amountToSendControl.value, value);
      this.change();
    });

    this.getQuotas();
  }

  change() {
    this.quotaDetail = this.listQuotas.find(
      (elem) => elem.quota === this.quotasControl.value
    );
    this.commission = this.amountToSendControl.value * (this.quotaDetail?.commissionRate / 100);
    this.total = this.commission + (+this.amountToSendControl.value);
    this.commissionEmitEvent.emit(this.commission);
    this.commissionRateEmitEvent.emit(this.quotaDetail?.commissionRate);
    this.totalEmitEvent.emit(this.total);
  }

  computeQuotaAmount(amount: string, quota: number) {
    if (amount && quota) {
      this.quotaAmountView = (Number((+amount / +quota).toFixed(2)));
    } else {
      this.quotaAmountView = 0;
    }
  }

  getQuotas() {
    this.sendMoneyService.getQuotaByProduct().subscribe(listQuotas => {
      this.listQuotas = listQuotas;
      const length = listQuotas.length;
      this.minQuota = listQuotas[0].quota;
      this.maxQuota = listQuotas[length - 1].quota;
      this.stepQuota = listQuotas[1].quota - listQuotas[0].quota;
    });
  }

  openDetails() {
    this.modalService.open(
      {
        component: ModalDetailsComponent,
        title: 'Resumen general',
        data: {
          currencyCode: this.currencyCode,
          amount: this.amountToSendControl.value,
          comission: this.commission,
          commissionRate: this.quotaDetail ? this.quotaDetail?.commissionRate : 0,
          quotas: this.quotasControl.value,
          qAmount: this.quotaAmountView,
          total: this.total
        }
      },
      {width: 380, height: 301, disableClose: false, panelClass: 'details-panel'}, 1
    );
  }
}
