import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BillingHistory} from 'src/app/shared/models/billing-history';
import {ModalService} from 'src/app/core/services/modal.service';
import {PopupMarchamosDetailComponent} from './popup-marchamos-detail/popup-marchamos-detail.component';
import {Item} from '../../../../../shared/models/item';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {HttpService} from '../../../../../core/services/http.service';
import {PopupMarchamosPaymentSummaryComponent} from './popup-marchamos-payment-summary/popup-marchamos-payment-summary.component';
import {MarchamoService} from '../marchamo.service';
import {StorageService} from 'src/app/core/services/storage.service';
import {OwnerPayer} from 'src/app/shared/models/owner-payer';
import {Quota} from '../../../../../shared/models/quota';
import {TagsService} from '../../../../../core/services/tags.service';
import {Tag} from '../../../../../shared/models/tag';
import {CustomerApiService} from '../../../../../core/services/customer-api.service';
import {ConvertStringAmountToNumber} from '../../../../../shared/utils';

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
  billingHistories: BillingHistory[];
  ownerPayer: OwnerPayer;
  executed = false;
  totalAmount = 0;
  isChecked = false;
  isCheckedAll = false;
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
  paymentList: {
    promoStatus: number;
    paymentDate: string;
  }[] = [];
  itemProduct: Item[];
  haveAdditionalProducts: boolean;
  arrayOfAmountProducts: { amounts: string | number; productCode: number; }[] = [];
  step2Subt3: string;
  step2Subt2: string;
  step2Com: string;
  step2TagT: string;
  step2Subt1: string;
  step2Link: string;
  step2TagDiv: string;

  constructor(private marchamosService: MarchamoService,
              private customerApiService: CustomerApiService,
              private httpService: HttpService,
              private modalService: ModalService,
              private storageService: StorageService,
              private tagsService: TagsService) {
  }

  get additionalProducts() {
    return this.secureAndQuotesForm.controls.additionalProducts as FormArray;
  }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Marchamo').tags)
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isActive && this.isActive && !this.executed) {
      this.executed = true;
      this.totalAmount = this.marchamosService.consultVehicle.amount;
      this.billingHistories = this.marchamosService.billingHistories;
      this.itemProduct = this.marchamosService.itemProduct;
      console.log(this.itemProduct);
      this.getQuotasByProduct();
      this.getOwnersPayerInfo();
      this.getPromo();
    }
  }

  showMarchamoDetail() {
    this.modalService.open({
      component: PopupMarchamosDetailComponent,
      hideCloseButton: false,
      title: 'Detalle del marchamo',
      data: this.billingHistories
    }, {width: 390, minHeight: 500, disableClose: false, panelClass: 'marchamo-detail-panel'});
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
      }));

      this.arrayOfAmountProducts.push({
        amounts: ConvertStringAmountToNumber(this.itemProduct.find(product => product.productCode === event.value).amount),
        productCode: event.value
      });
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

    this.marchamosService.setAmountProducts = this.arrayOfAmountProducts;
    (this.arrayOfAmountProducts.length < 3) ? this.isCheckedAll = false : this.isCheckedAll = true;
  }

  getValueOfCheckBoxAll(event) {
    this.allChecked(event.checked);
    if (event.checked) {
      this.itemProduct.forEach(value => {
        this.arrayOfAmountProducts.push({
          amounts: value.amount,
          productCode: value.productCode
        });
      });
      for (const product of this.itemProduct) {
        this.additionalProducts.push(
          new FormGroup({
            productCode: new FormControl(product.productCode)
          }));
        this.additionalProducts.removeAt(3);
      }
    } else {
      this.additionalProducts.controls.splice(0, this.itemProduct.length);
      this.additionalProducts.setValue([]);
      this.arrayOfAmountProducts.splice(0, this.itemProduct.length);
    }
    (this.arrayOfAmountProducts.length < 3) ? this.isCheckedAll = false : this.isCheckedAll = true;
  }

  allChecked(event?: boolean) {
    this.isChecked = event;
  }


  getPromo() {
    this.marchamosService.getPromoApply()
      .subscribe(response => {
        this.paymentList = response;
        this.marchamosService.paymentList = response;
      });
  }


  getQuotasByProduct() {
    this.customerApiService.getQuotas(2).subscribe(quotas => {
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

    this.marchamosService.getCommission(quotas, this.totalAmount)
      .subscribe((response) => {
        if (typeof response.result === 'string') {
          this.commission = ConvertStringAmountToNumber(response.result);
          this.iva = ConvertStringAmountToNumber(response.iva);
          this.marchamosService.iva = this.iva;
          this.marchamosService.commission = this.commission;
        }
      });
  }

  getOwnersPayerInfo() {
    this.marchamosService.getOwnersPayerInfo()
      .subscribe((response) => {
        this.ownerPayer = response;
      });
  }

  getTags(tags: Tag[]) {
    this.step2Subt1 = tags.find(tag => tag.description === 'marchamo.stepper2.subtitle1')?.value;
    this.step2Link = tags.find(tag => tag.description === 'marchamo.stepper2.link')?.value;
    this.step2Subt3 = tags.find(tag => tag.description === 'marchamo.stepper2.subtitle3')?.value;
    this.step2TagDiv = tags.find(tag => tag.description === 'marchamo.stepper2.tagdividr')?.value;
    this.step2Subt2 = tags.find(tag => tag.description === 'marchamo.stepper2.subtitle2')?.value;
    this.step2Com = tags.find(tag => tag.description === 'marchamo.stepper2.comision')?.value;
    this.step2TagT = tags.find(tag => tag.description === 'marchamo.stepper2.tagTodos')?.value;
  }
}
