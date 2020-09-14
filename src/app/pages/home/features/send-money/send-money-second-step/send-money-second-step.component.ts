import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {SendMoneyService} from '../send-money.service';
import {ModalService} from '../../../../../core/services/modal.service';
import {ModalDetailsComponent} from './modal-details/modal-details.component';
import {GlobalRequestsService} from '../../../../../core/services/global-requests.service';
import {Quota} from '../../../../../shared/models/quota';
import {TagsService} from '../../../../../core/services/tags.service';
import {Tag} from '../../../../../shared/models/tag';

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
  quotas: Quota[] = [];
  quotaAmountView = 0;
  quotaSliderStep = 1;
  quotaSliderMin = 3;
  quotaSliderMax = 12;
  quotaSliderDisplayMin = 1;
  quotaSliderDisplayMax = 12;
  quotaSliderDisplayValue = 0;
  total = 0;
  commission = 0;
  commissionRate = 0;
  step2Tag1: string;
  step2Subt1: string;

  constructor(private sendMoneyService: SendMoneyService,
              private globalRequestsService: GlobalRequestsService,
              private modalService: ModalService,
              private tagsService: TagsService) {
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

    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Enviar dinero').tags)
    );
  }

  getTags(tags: Tag[]) {
    this.step2Tag1 = tags.find(tag => tag.description === 'enviardinero.stepper2.tag1').value;
    this.step2Subt1 = tags.find(tag => tag.description === 'enviardinero.stepper2.subtitle1').value;
}

  change() {
    this.commissionRate = this.quotas.find((elem) => elem.quota === this.quotasControl.value).commissionRate;
    this.commission = this.amountToSendControl.value * (this.commissionRate / 100);
    this.total = this.commission + (+this.amountToSendControl.value);
    this.commissionEmitEvent.emit(this.commission);
    this.commissionRateEmitEvent.emit(this.commissionRate);
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
      this.quotas = quotas.sort((a, b) => a.quota - b.quota);
      this.quotaSliderDisplayMin = this.quotas[0].quota;
      this.quotaSliderMin = 1;
      this.quotaSliderDisplayMax = this.quotas[this.quotas.length - 1].quota;
      this.quotaSliderMax = this.quotas.length;
      this.quotaSliderDisplayValue = this.quotaSliderDisplayMin;
      this.quotasControl.setValue(this.quotaSliderDisplayValue);
    });
  }

  getQuota(sliderValue) {
    this.quotaSliderDisplayValue = this.quotas[sliderValue - 1].quota;
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
          commissionRate: this.commissionRate,
          quotas: this.quotasControl.value,
          qAmount: this.quotaAmountView,
          total: this.total
        }
      },
      {width: 380, height: 301, disableClose: false, panelClass: 'details-panel'}, 1
    );
  }
}
