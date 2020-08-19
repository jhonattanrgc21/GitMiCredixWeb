import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-popup-marchamos-pay-resume',
  templateUrl: './popup-marchamos-pay-resume.component.html',
  styleUrls: ['./popup-marchamos-pay-resume.component.scss']
})
export class PopupMarchamosPayResumeComponent implements OnInit {

  iva: number = 0;
  totalAmountItemsProducts: number = 0;
  comission: number;
  marchamo: number;
  quotesToPay: any[] = [];
  totalAmount: number = 0;

  constructor(public dialogRef: MatDialogRef<PopupMarchamosPayResumeComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
    this.data.data.forEach(values => {
      console.log(values);
      this.iva = (typeof values.iva === 'string') ? parseInt(values.iva) : values.iva;
      this.comission = values.commission;
      this.marchamo = (typeof values.marchamos === 'string') ? parseInt(values.marchamos.replace('.', '')) : values.marchamos,
        this.quotesToPay = values.quotesToPay;
      values.itemsProductsAmount.forEach(values => {
        this.totalAmountItemsProducts = this.totalAmountItemsProducts + values.moreProtectionAmount + values.responsabilityCivilAmount + values.roadAsistanceAmount;
      });
      this.totalAmount = this.totalAmount + this.marchamo + this.iva + this.comission + this.totalAmountItemsProducts;
    });
  }


}
