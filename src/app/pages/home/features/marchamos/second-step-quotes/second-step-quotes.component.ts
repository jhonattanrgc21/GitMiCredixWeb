import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PopupMarchamosPayResumeComponent } from '../popup-marchamos-pay-resume/popup-marchamos-pay-resume.component';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'second-step-quotes',
  templateUrl: './second-step-quotes.component.html',
  styleUrls: ['./second-step-quotes.component.scss']
})
export class SecondStepQuotesComponent implements OnInit {

  actualDate: Date = new Date();

  wishPayFirstCouteIn: any[] = [
    {
      description: 'Enero ' + (this.actualDate.getFullYear() + 1),
      value: 'Enero ' + (this.actualDate.getFullYear() + 1)
    },
    {
      description: 'Febrero ' + (this.actualDate.getFullYear() + 1),
      value: 'Febrero ' + (this.actualDate.getFullYear() + 1)
    },
    {
      description: 'Marzo ' + (this.actualDate.getFullYear() + 1),
      value: 'Marzo ' + (this.actualDate.getFullYear() + 1)
    },
    {
      description: 'Abril ' + (this.actualDate.getFullYear() + 1),
      value: 'Abril ' + (this.actualDate.getFullYear() + 1)
    },
    {
      description: 'Mayo ' + (this.actualDate.getFullYear() + 1),
      value: 'Mayo ' + (this.actualDate.getFullYear() + 1)
    },
    {
      description: 'Junio ' + (this.actualDate.getFullYear() + 1),
      value: 'Junio ' + (this.actualDate.getFullYear() + 1)
    },
    {
      description: 'Julio ' + (this.actualDate.getFullYear() + 1),
      value: 'Julio ' + (this.actualDate.getFullYear() + 1)
    },
    {
      description: 'Agosto ' + (this.actualDate.getFullYear() + 1),
      value: 'Agosto ' + (this.actualDate.getFullYear() + 1)
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
  maxQuotes: number;
  minQuotes: number;
  value: number;
  commission:number = 0;
  iva: number;
  private dataForPayResumen: any[] = [];
  quotesToPayOfAmount: boolean = false;


  private popupPayResume: MatDialogRef<PopupMarchamosPayResumeComponent | any>;


  @Input() totalMount:any;
  @Input() quotesAmount: number;
  @Input() amountItemsProducts: {responsabilityCivilAmount:number, roadAsistanceAmount: number, moreProtectionAmount:number};

  // FormControls
  @Input() firstCouteToPayIn: FormControl;
  @Input() quotesToPay: FormControl;

  // dataEmit
  @Output() dataQuotes: EventEmitter<any> = new EventEmitter<any>();

  constructor(private httpService: HttpService , private modalService: ModalService) { }

  ngOnInit(): void {
    this.getListQuotesByProduct();
  }

  getValueSlider(event?) {
    this.value = event;
    this.getCommission(this.value);
    if (typeof this.totalMount === 'string') {
      (event > 0) ? this.quotesAmount = parseInt(this.totalMount.replace('.', '')) / this.value : this.quotesAmount;
    } else {
      (event > 0) ? this.quotesAmount = this.totalMount / this.value : this.quotesAmount;
    }
    this.quotesToPay.patchValue(this.quotesAmount);
    this.dataQuotes.emit({iva: this.iva, commission: this.commission, quotes:this.value});
  }

  getCommission(commission: number) {
    this.httpService.post('marchamos', 'pay/calculatecommission', {
      channelId: 101,
      amount: (typeof this.totalMount === 'string') ? parseInt(this.totalMount.replace(',', '')) : this.totalMount,
      commissionQuotasId: commission
    }).subscribe(response => {
      if (typeof response.result === 'string') {
        this.commission = parseInt(response.result.replace('.', ''));
        this.iva = parseInt(response.iva.replace('.', ''));
      }

    });
  }

  getListQuotesByProduct() {
    this.httpService.post('canales', 'customerservice/listquotabyproduct', {channelId: 102, productId: 2})
      .subscribe(response => {
        this.minQuotes = response.listQuota.shift().quota;
        this.value = this.minQuotes;
        this.maxQuotes = response.listQuota.slice(response.listQuota.lastIndexOf())[0].quota;
        (this.value > 0) ? this.quotesToPayOfAmount = true : false;
      });
  }

  payResume() {
    this.dataForPayResumen = [{
      marchamos: this.totalMount,
      itemsProductsAmount: [this.amountItemsProducts],
      commission: this.commission,
      iva: this.iva,
      quotesToPay: [
        {
          quotes: this.value,
          quotesAmount: this.quotesAmount
        }
      ]
    }];
    this.popupPayResume = this.modalService.open({
      component: PopupMarchamosPayResumeComponent,
      hideCloseButton: false,
      title: 'Resumen del pago',
      data: this.dataForPayResumen
    }, {width: 380, height: 417, disableClose: false});
    this.popupPayResume.afterClosed();
  }
}
