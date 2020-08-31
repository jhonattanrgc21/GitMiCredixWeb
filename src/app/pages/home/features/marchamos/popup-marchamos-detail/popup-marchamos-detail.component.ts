import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BillingHistory} from 'src/app/shared/models/billingHistory.models';

@Component({
  selector: 'app-popup-marchamos-detail',
  templateUrl: './popup-marchamos-detail.component.html',
  styleUrls: ['./popup-marchamos-detail.component.scss']
})
export class PopupMarchamosDetailComponent implements OnInit {

  billingHistorys: BillingHistory[];
  totalAmount = 0;
  totalAmountString: string;

  constructor(public dialogRef: MatDialogRef<PopupMarchamosDetailComponent>, @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
    this.billingHistorys = this.data.data;
    this.calculateTotalAmount();
  }

  calculateTotalAmount() {
    this.billingHistorys.forEach(values => {
      this.totalAmount = this.totalAmount + values.itemCurrentAmount;
    });
  }

}
