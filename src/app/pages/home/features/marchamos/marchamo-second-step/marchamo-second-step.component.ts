import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BillingHistory} from 'src/app/shared/models/billingHistory.models';
import {ModalService} from 'src/app/core/services/modal.service';
import {PopupMarchamosDetailComponent} from './popup-marchamos-detail/popup-marchamos-detail.component';
import {Item} from '../../../../../shared/models/item.model';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {HttpService} from '../../../../../core/services/http.service';
import {PopupMarchamosPaymentSummaryComponent} from './popup-marchamos-payment-summary/popup-marchamos-payment-summary.component';
import {MarchamosService} from '../marchamos.service';
import {StorageService} from 'src/app/core/services/storage.service';
import {OwnerPayer} from 'src/app/shared/models/ownerPayer.model';
import {GlobalRequestsService} from '../../../../../core/services/global-requests.service';
import {Quota} from '../../../../../shared/models/quota';

@Component({
  selector: 'app-marchamo-second-step',
  templateUrl: './marchamo-second-step.component.html',
  styleUrls: ['./marchamo-second-step.component.scss']
})
export class MarchamoSecondStepComponent implements OnInit, OnChanges {
  @Input() secureAndQuotesForm = new FormGroup({
    additionalProducts: new FormArray([]),
    quota: new FormControl(null),
    quotaId: new FormControl(null),
    firstQuotaDate: new FormControl(null)
  });
  @Input() isActive = false;
  executed = false;
  totalAmount = 0;
  billingHistories: BillingHistory[];
  ownerPayer: OwnerPayer;
  isChecked = false;
  step = 0;
  showQuotaPaymentSelect = false;
  quotas: Quota[] = [];
  quotaSliderStep = 1;
  quotaSliderMin = 3;
  quotaSliderMax = 12;
  quotaSliderDisplayMin = 1;
  quotaSliderDisplayMax = 12;
  quotaSliderDisplayValue = 0;
  amountPerQuota = 0;
  commission = 0;
  iva = 0;
  itemProduct: Item[] = [
    {
      responseDescription: 'Responsabilidad civil',
      responseCode: 15,
      productCode: 5
    },
    {
      responseDescription: 'Asistencia en carretera',
      responseCode: 15,
      productCode: 6
    },
    {
      responseDescription: 'Mas protección',
      responseCode: 15,
      productCode: 8
    }
  ];
  amountItemsProducts: { responsabilityCivilAmount: number, roadAsistanceAmount: number, moreProtectionAmount: number } = {
    responsabilityCivilAmount: 8745.00,
    roadAsistanceAmount: 3359.00,
    moreProtectionAmount: 7140.00
  };
  firstPaymentDates = [
    {
      description: 'Enero ' + (new Date().getFullYear() + 1),
      value: 'Enero ' + (new Date().getFullYear() + 1)
    },
    {
      description: 'Febrero ' + (new Date().getFullYear() + 1),
      value: 'Febrero ' + (new Date().getFullYear() + 1)
    },
    {
      description: 'Marzo ' + (new Date().getFullYear() + 1),
      value: 'Marzo ' + (new Date().getFullYear() + 1)
    },
    {
      description: 'Abril ' + (new Date().getFullYear() + 1),
      value: 'Abril ' + (new Date().getFullYear() + 1)
    },
    {
      description: 'Mayo ' + (new Date().getFullYear() + 1),
      value: 'Mayo ' + (new Date().getFullYear() + 1)
    },
    {
      description: 'Junio ' + (new Date().getFullYear() + 1),
      value: 'Junio ' + (new Date().getFullYear() + 1)
    },
    {
      description: 'Julio ' + (new Date().getFullYear() + 1),
      value: 'Julio ' + (new Date().getFullYear() + 1)
    },
    {
      description: 'Agosto ' + (new Date().getFullYear() + 1),
      value: 'Agosto ' + (new Date().getFullYear() + 1)
    },
    {
      description: 'Septiembre 2020',
      value: 'Septiembre 2020'
    },
    {
      description: 'Octubre 2020',
      value: 'Octubre 2020'
    },
    {
      description: 'Noviembre 2020',
      value: 'Noviembre 2020'
    },
    {
      description: 'Diciembre 2020',
      value: 'Diciembre 2020'
    }
  ];

  constructor(private marchamosService: MarchamosService,
              private globalRequestsService: GlobalRequestsService,
              private httpService: HttpService,
              private modalService: ModalService,
              private storageService: StorageService) {
  }

  get additionalProducts() {
    return this.secureAndQuotesForm.controls.additionalProducts as FormArray;
  }

  ngOnInit(): void {
    this.marchamosService.consultVehicleAndBillingHistory.subscribe(value => {
      this.totalAmount = value.consultVehicle.amount;
      this.billingHistories = value.billingHistories;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isActive && this.isActive && !this.executed) {
      this.executed = true;
      this.getQuotasByProduct();
      this.getOwnersPayerInfo();
      this.marchamosService.emitAmountItemsProducts(this.amountItemsProducts.responsabilityCivilAmount,
        this.amountItemsProducts.roadAsistanceAmount, this.amountItemsProducts.moreProtectionAmount);
    }
  }

  showMarchamoDetail() {
    this.modalService.open({
      component: PopupMarchamosDetailComponent,
      hideCloseButton: false,
      title: 'Detalle del marchamo',
      data: this.billingHistories
    }, {width: 384, height: 673, disableClose: false, panelClass: 'marchamo-detail-panel'});
  }

  showQuotaDetail() {
    this.modalService.open({
      component: PopupMarchamosPaymentSummaryComponent,
      hideCloseButton: false,
      title: 'Resumen del pago',
      data: [{
        marchamos: this.totalAmount,
        itemsProductsAmount: [this.amountItemsProducts],
        commission: this.commission,
        iva: this.iva,
        quotesToPay: {quotes: this.secureAndQuotesForm.controls.quota.value, quotesAmount: this.amountPerQuota}
      }]
    }, {width: 380, height: 417, disableClose: false, panelClass: 'marchamo-summary-panel'});
  }

  getValueCheckBoxes(event: any) {
    if (event.checked) {
      (this.additionalProducts).push(new FormGroup({
          productCode: new FormControl(event.value)
        })
      );
    } else {
      let index = 0;
      this.additionalProducts.controls.forEach((item: FormGroup) => {
        if (item.value.productCode === event.value) {
          this.additionalProducts.removeAt(index);
          return;
        }
        index++;
      });
    }
  }

  getValueOfCheckBoxAll(event) {
    if (event.value === 10 && event.checked) {
      this.allChecked(event.checked);

      for (const product of this.itemProduct) {
        this.additionalProducts.push(
          new FormGroup({
            productCode: new FormControl(product.productCode)
          }));

        this.additionalProducts.removeAt(3);
      }
    } else {
      this.allChecked(event.checked);
      this.additionalProducts.controls.splice(0, this.itemProduct.length);
      this.additionalProducts.setValue([]);
    }
  }

  allChecked(event?: any) {
    this.isChecked = event;
  }

  getQuotasByProduct() {
    this.globalRequestsService.getQuotas(2).subscribe(quotas => {
      this.quotas = quotas.sort((a, b) => a.quota - b.quota);
      this.quotaSliderDisplayMin = this.quotas[0].quota;
      this.quotaSliderMin = 1;
      this.quotaSliderDisplayMax = this.quotas[this.quotas.length - 1].quota;
      this.quotaSliderMax = this.quotas.length;
      this.quotaSliderDisplayValue = this.quotaSliderDisplayMin;
      this.showQuotaPaymentSelect = this.quotaSliderDisplayMin > 1;
      this.secureAndQuotesForm.controls.quota.setValue(this.quotaSliderDisplayMin);
      this.secureAndQuotesForm.controls.quotaId.setValue(this.quotas[0].id);
      this.computeAmountPerQuota(this.quotaSliderDisplayMin);
    });
  }

  getQuota(sliderValue) {
    this.quotaSliderDisplayValue = this.quotas[sliderValue - 1].quota;
    this.secureAndQuotesForm.controls.quota.setValue(this.quotaSliderDisplayValue);
    this.secureAndQuotesForm.controls.quotaId.setValue(this.quotas[sliderValue - 1].id);
    console.log(this.secureAndQuotesForm.value);
    this.getCommission(this.quotas.find(element => element.quota === this.quotaSliderDisplayValue).quota);
    this.computeAmountPerQuota(this.quotaSliderDisplayValue);
  }

  computeAmountPerQuota(quota: number) {
    if (quota > 0) {
      this.amountPerQuota = this.totalAmount / quota;
    } else {
      this.amountPerQuota = this.totalAmount;
    }
  }

  getCommission(quotas: number) {
    this.httpService.post('marchamos', 'pay/calculatecommission', {
      channelId: 102,
      amount: this.totalAmount,
      commissionQuotasId: quotas
    }).subscribe(response => {
      if (typeof response.result === 'string') {
        this.commission = +response.result.replace('.', '').replace(',', '.');
        this.iva = +response.iva.replace('.', '').replace(',', '.');
        this.marchamosService.emitIvaAndCommission(this.iva, this.commission);
      }
    });
  }

  getOwnersPayerInfo() {
    this.httpService.post('marchamos', 'owners/payerinfo', {
      channelId: 107,
      payerId: null,
      accountNumber: this.storageService.getCurrentUser().accountNumber
    })
      .subscribe(response => {
        this.ownerPayer = response.REQUESTRESULT.soaResultPayerInfo.header;
        this.marchamosService.emitOwnerPayerInfo(this.ownerPayer);
      });
  }
}
