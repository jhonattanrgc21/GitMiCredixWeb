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

  constructor(public dialogRef: MatDialogRef<PopupAllReceiptsComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData) {
  }

  ngOnInit(): void {
    console.log(this.dialogData.data);
    this.receipts = this.dialogData.data;
  }

}
