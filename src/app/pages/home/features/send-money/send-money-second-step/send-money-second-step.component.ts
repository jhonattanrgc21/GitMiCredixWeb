import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {SendMoneyService} from '../send-money.service';
import {ModalService} from '../../../../../core/services/modal.service';
import {ModalDetailsComponent} from './modal-details/modal-details.component';
import {Quota} from '../../../../../shared/models/quota';
import {TagsService} from '../../../../../core/services/tags.service';
import {Tag} from '../../../../../shared/models/tag';
import {CustomerApiService} from '../../../../../core/services/customer-api.service';
import { ChannelsApiService } from 'src/app/core/services/channels-api.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { ConvertStringAmountToNumber } from 'src/app/shared/utils';

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
  cardId: number;
  accountSummary;
  amountAvailableDolar: string;
  limitAmountSendMoney: string;
  ivaRate: number;
  iva: number;

  constructor(private sendMoneyService: SendMoneyService,
              private customerApiService: CustomerApiService,
              private modalService: ModalService,
              private tagsService: TagsService,
              private channelsApiService: ChannelsApiService,
              private storageService: StorageService,
              ) {
  }

  ngOnInit(): void {

    
    this.amountToSendControl.valueChanges.subscribe(value => {
      this.computeQuotaAmount(value, this.quotasControl.value);
      this.change();

      if ( value > ConvertStringAmountToNumber( this.amountAvailableDolar ) || value > ConvertStringAmountToNumber(  this.limitAmountSendMoney ) ) {
        if ( value >  ConvertStringAmountToNumber( this.limitAmountSendMoney ) ) {
          this.amountToSendControl.setErrors({'maxLimitAmount': true});
        } else {
          this.amountToSendControl.setErrors({'limitAmount': true});
        }
      }
      
    });

    this.cardId = this.storageService.getCurrentCards().find(card => card.category === 'Principal')?.cardId;
    this.getAccountsSummary();

    this.quotasControl.valueChanges.subscribe(value => {
      this.computeQuotaAmount(this.amountToSendControl.value, value);
      this.change();
    });

    this.getQuotas();

    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Enviar dinero').tags)
    );
  }

  change() {
    this.commissionRate = this.quotas.find((elem) => elem.quota === this.quotasControl.value).commissionRate;
    this.commission = this.amountToSendControl.value * (this.commissionRate / 100);
    this.iva = this.commission * this.ivaRate;
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
    this.customerApiService.getQuotas(3).subscribe(quotas => {
      this.ivaRate = quotas.IVA;
      this.quotas = quotas.listQuota.sort((a, b) => a.quota - b.quota);
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

  getAccountsSummary() {
    this.channelsApiService.getAccountSummary(this.cardId).subscribe(accountSummary => {
      this.accountSummary = accountSummary;
      this.sendMoneyService.getvailabledolarlimitsendmoney( ConvertStringAmountToNumber( this.accountSummary.available ) )
        .subscribe(
          response => {
            this.amountAvailableDolar = response.amountAvailableDolar;
            this.limitAmountSendMoney = response.limitAmountSendMoney;

            console.log("response: ", response);
          }
        )
    });
  }

  getTags(tags: Tag[]) {
    this.step2Tag1 = tags.find(tag => tag.description === 'enviardinero.stepper2.tag1')?.value;
    this.step2Subt1 = tags.find(tag => tag.description === 'enviardinero.stepper2.subtitle1')?.value;
  }
}
