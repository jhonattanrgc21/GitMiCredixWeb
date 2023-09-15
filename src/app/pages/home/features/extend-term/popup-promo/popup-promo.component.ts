import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-popup-promo',
  templateUrl: './popup-promo.component.html',
  styleUrls: ['./popup-promo.component.scss']
})
export class PopupPromoComponent implements OnInit, OnDestroy {

  promoDescription: string;
  promoMessage: string;
  constructor(public dialogRef: MatDialogRef<PopupPromoComponent>, @Inject(MAT_DIALOG_DATA) public dataModal) {
    const { data } = dataModal;
    const {promoMessage, promoDescription} = data;
    this.promoDescription = promoDescription;
    this.promoMessage = promoMessage;
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
  }
}
