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
  showPaymentDates = false;
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
  payments: { promoStatus: number; paymentDate: string; }[] = [];
  itemProduct: Item[];
  arrayOfAmountProducts: { amounts: string | number; productCode: number; }[] = [];
  hasAdditionalProducts: boolean;
  secondStepFirstSubtitle: string;
  secondStepSecondSubtitle: string;
  secondStepThirdSubtitle: string;
  secondStepCom: string;
  secondStepTagT: string;
  secondStepLink: string;
  secondStepTagDiv: string;

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
      this.getTags(functionality.find(fun => fun.description === 'Marchamo').tags));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isActive && this.isActive && !this.executed) {
      this.executed = true;
      this.totalAmount = this.marchamosService.consultVehicle.amount;
      this.billingHistories = this.marchamosService.billingHistories;
      this.itemProduct = this.marchamosService.itemProduct;
      this.hasAdditionalProducts = this.marchamosService.hasAdditionalProducts;
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
        quotesToPay: {
          quotes: !this.secureAndQuotesForm.controls.quota.value ? '' : this.secureAndQuotesForm.controls.quota.value,
          quotesAmount: this.amountPerQuota
        }
      }]
    }, {width: 380, height: 417, disableClose: false, panelClass: 'marchamo-summary-panel'});
  }

  getValueCheckBoxes(isChecked: boolean, item: Item) {
    item.isSelected = isChecked;

    if (isChecked) {
      this.additionalProducts.push(new FormGroup({
        productCode: new FormControl(item.productCode)
      }));

      this.arrayOfAmountProducts.push({
        amounts: ConvertStringAmountToNumber(item.amount),
        productCode: item.productCode
      });

    } else {
      const indexToRemove = this.additionalProducts.controls.findIndex(a => a.value.productCode.vaule === item.productCode);
      this.additionalProducts.removeAt(indexToRemove);
      const indexToRemoveFromArray = this.arrayOfAmountProducts.findIndex(a => a.productCode === item.productCode);
      this.arrayOfAmountProducts.splice(indexToRemoveFromArray, 1);
    }

    this.marchamosService.setAmountProducts = this.arrayOfAmountProducts;
    this.isCheckedAll = this.arrayOfAmountProducts.length === this.itemProduct.length;
    this.computeAmountPerQuota(this.quotaSliderDisplayValue);
  }

  getValueOfCheckBoxAll(event) {
    this.isChecked = event.checked;
    this.isCheckedAll = event.checked;
    this.additionalProducts.controls = [];
    this.arrayOfAmountProducts = [];

    if (event.checked) {
      this.itemProduct.forEach(value => {
        this.getValueCheckBoxes(event.checked, value);
      });
    } else {
      this.itemProduct.forEach(value => {
        value.isSelected = false;
      });
      this.marchamosService.setAmountProducts = this.arrayOfAmountProducts;
    }

    this.computeAmountPerQuota(this.quotaSliderDisplayValue);
  }

  getPromo() {
    this.marchamosService.getPromoApply().subscribe(response => {
      this.payments = response;
      this.marchamosService.payments = response;
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
      this.showPaymentDates = this.quotaSliderDisplayMin > 1;
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
      this.amountPerQuota = (this.totalAmount + this.iva + this.getTotalAmountItemsProducts()) / quota;
    } else {
      this.amountPerQuota = this.totalAmount;
    }
  }

  getTotalAmountItemsProducts(): number {
    let totalAmountItemsProducts = 0;
    this.arrayOfAmountProducts.forEach(itemProduct => {
      totalAmountItemsProducts = totalAmountItemsProducts +
        (typeof itemProduct.amounts === 'string' ? ConvertStringAmountToNumber(itemProduct.amounts) : itemProduct.amounts);
    });
    return totalAmountItemsProducts;
  }

  getCommission(quotas: number) {
    this.marchamosService.getCommission(quotas, this.totalAmount).subscribe((response) => {
      if (typeof response.result === 'string') {
        this.commission = ConvertStringAmountToNumber(response.result);
        this.iva = ConvertStringAmountToNumber(response.iva);
        this.marchamosService.iva = this.iva;
        this.marchamosService.commission = this.commission;
        localStorage.setItem("delivery", response.deliveryAmount);
      }
    });
  }

  getOwnersPayerInfo() {
    this.marchamosService.getOwnersPayerInfo().subscribe(response => this.ownerPayer = response);
  }

  getTags(tags: Tag[]) {
    this.secondStepFirstSubtitle = tags.find(tag => tag.description === 'marchamo.stepper2.subtitle1')?.value;
    this.secondStepSecondSubtitle = tags.find(tag => tag.description === 'marchamo.stepper2.subtitle2')?.value;
    this.secondStepThirdSubtitle = tags.find(tag => tag.description === 'marchamo.stepper2.subtitle3')?.value;
    this.secondStepLink = tags.find(tag => tag.description === 'marchamo.stepper2.link')?.value;
    this.secondStepTagDiv = tags.find(tag => tag.description === 'marchamo.stepper2.tagdividr')?.value;
    this.secondStepCom = tags.find(tag => tag.description === 'marchamo.stepper2.comision')?.value;
    this.secondStepTagT = tags.find(tag => tag.description === 'marchamo.stepper2.tagTodos')?.value;
  }
}
