import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Receipt} from '../../../../../../shared/models/receipt';

@Component({
  selector: 'app-popup-all-receipts',
  templateUrl: './popup-all-receipts.component.html',
  styleUrls: ['./popup-all-receipts.component.scss']
})
export class PopupAllReceiptsComponent implements OnInit {
  receipts: Receipt[] = [];
  validateAntiquity: string;
  companyName: string;

  constructor(public dialogRef: MatDialogRef<PopupAllReceiptsComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData) {
  }

  ngOnInit(): void {
    this.receipts = this.dialogData.data.receipts;
    this.validateAntiquity = this.dialogData.data.validateAntiquity;
    this.companyName = this.dialogData.data.companyName;
  }

  getReceiptToPay(receipt: Receipt) {
    this.dialogRef.close(receipt);
  }

  getOldReceipt(receipt: Receipt) {
    if (receipt) {
      this.dialogRef.close(receipt);
    }
  }

}
