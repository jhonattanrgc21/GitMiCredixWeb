import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {SendMoneyService} from '../send-money.service';
import {ModalService} from '../../../../../core/services/modal.service';
import {ModalDetailsComponent} from './modal-details/modal-details.component';
import {GlobalRequestsService} from '../../../../../core/services/global-requests.service';

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
  quotas = [];
  quotaAmountView = 0;
  quotaSliderStep = 1;
  quotaSliderMin = 3;
  quotaSliderMax = 12;
  quotaSliderDisplayMin = 1;
  quotaSliderDisplayMax = 12;
  quotaSliderDisplayValue = 0;
  total = 0;
  commission = 0;
  quotaDetail = {commissionRate: 0, quota: 0, description: '', id: 1};

  constructor(private sendMoneyService: SendMoneyService,
              private globalRequestsService: GlobalRequestsService,
              private modalService: ModalService) {
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
    this.quotaDetail = this.quotas.find(
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
    this.globalRequestsService.getQuotas(3).subscribe(quotas => {
      this.quotas = quotas.sort((a, b) => a - b);
      this.quotaSliderDisplayMin = this.quotas[0];
      this.quotaSliderMin = 1;
      this.quotaSliderDisplayMax = this.quotas[this.quotas.length - 1];
      this.quotaSliderMax = this.quotas.length;
      this.quotaSliderDisplayValue = this.quotaSliderDisplayMin;
      this.quotasControl.setValue(this.quotaSliderDisplayValue);
    });
  }

  getQuota(sliderValue) {
    this.quotaSliderDisplayValue = this.quotas[sliderValue - 1];
    this.quotasControl.setValue(this.quotaSliderDisplayValue);
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
