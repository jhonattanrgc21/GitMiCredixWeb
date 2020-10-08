import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PopupReceipt} from '../../../../../../shared/models/popup-receipt';

@Component({
  selector: 'app-popup-receipt',
  templateUrl: './popup-receipt.component.html',
  styleUrls: ['./popup-receipt.component.scss']
})
export class PopupReceiptComponent implements OnInit {
  dataShowModal: PopupReceipt;
  currencySymbol: string;

  constructor(public dialogRef: MatDialogRef<PopupReceiptComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
    this.dataShowModal = this.data.data;
  }

}
