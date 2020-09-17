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
import {TagsService} from '../../../../../core/services/tags.service';
import {Tag} from '../../../../../shared/models/tag';

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
      productCode: 5,
      amount: 8745.00
    },
    {
      responseDescription: 'Asistencia en carretera',
      responseCode: 15,
      productCode: 6,
      amount: 3359.00
    },
    {
      responseDescription: 'Mas protección',
      responseCode: 15,
      productCode: 8,
      amount: 7140.00
    }
  ];
  amountItemsProducts: { responsabilityCivilAmount: number, roadAsistanceAmount: number, moreProtectionAmount: number } = {
    responsabilityCivilAmount: 8745.00,
    roadAsistanceAmount: 3359.00,
    moreProtectionAmount: 7140.00
  };
  arrayOfAmountProducts: { amounts: number; productCode: number; }[] = [];
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
  step2Subt3: string;
  step2Subt2: string;
  step2Com: string;
  step2TagT: string;
  step2Subt1: string;
  step2Link: string;
  step2TagDiv: string;

  constructor(private marchamosService: MarchamosService,
              private globalRequestsService: GlobalRequestsService,
              private httpService: HttpService,
              private modalService: ModalService,
              private storageService: StorageService,
              private tagsService: TagsService) {
  }

  get additionalProducts() {
    return this.secureAndQuotesForm.controls.additionalProducts as FormArray;
  }

  ngOnInit(): void {
    this.marchamosService.consultVehicleAndBillingHistory.subscribe(value => {
      this.totalAmount = value.consultVehicle.amount;
      this.billingHistories = value.billingHistories;
    });
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Marchamo').tags)
    );
    // this.marchamosService.emitAmountItemsProducts(this.arrayOfAmountProducts);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isActive && this.isActive && !this.executed) {
      this.executed = true;
      this.getQuotasByProduct();
      this.getOwnersPayerInfo();
    }
  }
  getTags(tags: Tag[]) {
    this.step2Subt1 = tags.find(tag => tag.description === 'marchamos.stepper2.subtitle1').value;
    this.step2Link = tags.find(tag => tag.description === 'marchamos.stepper2.link').value;
    this.step2Subt3 = tags.find(tag => tag.description === 'marchamos.stepper2.subtitle3').value;
    this.step2TagDiv = tags.find(tag => tag.description === 'marchamos.stepper2.tagdividr').value;
    this.step2Subt2 = tags.find(tag => tag.description === 'marchamos.stepper2.subtitle2').value;
    this.step2Com = tags.find(tag => tag.description === 'marchamos.stepper2.comision').value;
    this.step2TagT = tags.find(tag => tag.description === 'marchamos.stepper2.tagTodos').value;
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
        itemsProductsAmount: this.arrayOfAmountProducts,
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

      this.arrayOfAmountProducts.push({
        amounts: this.itemProduct.find(product => product.productCode === event.value).amount,
        productCode: event.value
      });

      this.isChecked = this.additionalProducts.length === 3;
    } else {
      let index = 0;
      this.additionalProducts.controls.forEach((item: FormGroup) => {
        if (item.value.productCode === event.value) {
          this.additionalProducts.removeAt(index);
          return;
        }
        index++;
      });
      this.arrayOfAmountProducts.forEach((value, i) => {
        if (value.productCode === event.value) {
          this.arrayOfAmountProducts.splice(i, 1);
        }
      });
    }
    this.marchamosService.emitAmountItemsProducts(this.arrayOfAmountProducts);
  }

  getValueOfCheckBoxAll(event) {
    if (event.checked) {
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
