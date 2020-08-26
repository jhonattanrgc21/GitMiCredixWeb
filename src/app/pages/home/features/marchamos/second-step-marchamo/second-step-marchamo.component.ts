import {Component, Input, OnInit, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import {BillingHistory} from 'src/app/shared/models/billingHistory.models';
import {ModalService} from 'src/app/core/services/modal.service';
import {PopupMarchamosDetailComponent} from '../popup-marchamos-detail/popup-marchamos-detail.component';
import {Item} from '../../../../../shared/models/item.model';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {HttpService} from '../../../../../core/services/http.service';
import {PopupMarchamosPayResumeComponent} from '../popup-marchamos-pay-resume/popup-marchamos-pay-resume.component';
import {MarchamosService} from '../marchamos.service';

@Component({
  selector: 'app-second-step-marchamo',
  templateUrl: './second-step-marchamo.component.html',
  styleUrls: ['./second-step-marchamo.component.scss']
})
export class SecondStepMarchamoComponent implements OnInit, OnChanges {
  @Input() secureAndQuotesForm = new FormGroup({
    additionalProducts: new FormArray([]),
    quota: new FormControl(null),
    quotaId: new FormControl(null),
    firstQuotaDate: new FormControl(null)
  });
  @Input() isActive:boolean = false;
  totalAmount = 0;
  billingHistories: BillingHistory[];
  isChecked = false;
  max = 0;
  min = 0;
  quotaValue = 1;
  step = 0;
  showQuotaPaymentSelect = false;
  quotas = [];
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

  constructor(private httpService: HttpService,
              private marchamosService: MarchamosService,
              private modalService: ModalService) {
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

  ngOnChanges(changes:SimpleChanges){
    if(changes.isActive && this.isActive){
      this.getQuotasByProduct();
    }
  }

  showMarchamoDetail() {
    this.modalService.open({
      component: PopupMarchamosDetailComponent,
      hideCloseButton: false,
      title: 'Detalle del marchamo',
      data: this.billingHistories
    }, {width: 380, height: 673, disableClose: false, panelClass: 'marchamo-detail-panel'});
  }

  showQuotaDetail() {
    this.modalService.open({
      component: PopupMarchamosPayResumeComponent,
      hideCloseButton: false,
      title: 'Resumen del pago',
      data: [{
        marchamos: this.totalAmount,
        itemsProductsAmount: [this.amountItemsProducts],
        commission: this.commission,
        iva: this.iva,
        quotesToPay: [
          {
            quotes: this.secureAndQuotesForm.controls.quota,
            quotesAmount: this.amountPerQuota
          }
        ]
      }]
    }, {width: 380, height: 417, disableClose: false});
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
    this.httpService.post('canales', 'customerservice/listquotabyproduct', {channelId: 102, productId: 2})
      .subscribe(response => {
        this.quotas = response.listQuota;
        const length = response.listQuota.length;
        this.min = response.listQuota[0].quota;
        this.max = response.listQuota[length - 1].quota;
        this.step = response.listQuota[1].quota - response.listQuota[0].quota;
        this.showQuotaPaymentSelect = this.min > 1;
        this.secureAndQuotesForm.controls.quota.setValue(this.min);
        this.secureAndQuotesForm.controls.quotaId.setValue(response.listQuota[0].id);
        this.computeAmountPerQuota(this.min);
      });
  }

  onSliderChanged(value) {
    this.secureAndQuotesForm.controls.quota.setValue(value);
    this.showQuotaPaymentSelect = value > 1;
    this.secureAndQuotesForm.controls.quotaId.setValue(this.quotas.find(element => element.quota === value).id);
    this.getCommission(value);
    this.computeAmountPerQuota(value);

    //  this.dataQuotes.emit({iva: this.iva, commission: this.commission, quotes: this.value, id: id});
  }

  computeAmountPerQuota(quota: number) {
    if (quota > 0) {
      this.amountPerQuota = this.totalAmount / quota;
    } else {
      this.amountPerQuota = this.totalAmount;
    }
  }

  getCommission(commission: number) {
    this.httpService.post('marchamos', 'pay/calculatecommission', {
      channelId: 101,
      amount: this.totalAmount,
      commissionQuotasId: commission
    }).subscribe(response => {
      if (typeof response.result === 'string') {
        this.commission = +response.result.replace('.', '');
        this.iva = +response.iva.replace('.', '');
        this.marchamosService.emitIvaAndCommission(this.iva, this.commission);
      }
    });
  }
}
