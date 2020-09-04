import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-popup-marchamos-payment-summary',
  templateUrl: './popup-marchamos-payment-summary.component.html',
  styleUrls: ['./popup-marchamos-payment-summary.component.scss']
})
export class PopupMarchamosPaymentSummaryComponent implements OnInit {
  iva = 0;
  totalAmountItemsProducts = 0;
  comission: number;
  marchamo: number;
  quotesToPay: { quotes: number, quotesAmount: number } = {quotes: 0, quotesAmount: 0};
  totalAmount = 0;

  constructor(public dialogRef: MatDialogRef<PopupMarchamosPaymentSummaryComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
    this.data.data.forEach(values => {
      this.iva = (typeof values.iva === 'string') ? +values.iva : values.iva;
      this.comission = values.commission;
      this.marchamo = (typeof values.marchamos === 'string') ? +values.marchamos.replace('.', '') : values.marchamos,
        this.quotesToPay = values.quotesToPay;
      values.itemsProductsAmount.forEach(itemProduct => {
        this.totalAmountItemsProducts = this.totalAmountItemsProducts + itemProduct.moreProtectionAmount
          + itemProduct.responsabilityCivilAmount + itemProduct.roadAsistanceAmount;
      });
      this.totalAmount = this.totalAmount + this.marchamo + this.iva + this.comission + this.totalAmountItemsProducts;
    });
  }


}
