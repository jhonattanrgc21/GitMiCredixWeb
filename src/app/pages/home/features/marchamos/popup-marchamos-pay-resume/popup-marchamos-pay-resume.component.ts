import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.data.data.forEach(values => {
      console.log(values);
      values.billingHistory.map(value => { (value.itemPayCode === 22 && value.itemDescription === 'IVA') ? this.iva = value.itemCurrentAmount: this.iva;});
      this.comission = values.commission;
      this.marchamo = values.marchamos;
      this.quotesToPay = values.quotesToPay;
      values.itemsProductsAmount.forEach(values => {
        this.totalAmountItemsProducts = this.totalAmountItemsProducts + values.moreProtectionAmount + values.responsabilityCivilAmount + values.roadAsistanceAmount;
      });
      this.totalAmount = this.totalAmount + this.marchamo + this.iva + this.comission + this.totalAmountItemsProducts;
    });
  }

  
}
