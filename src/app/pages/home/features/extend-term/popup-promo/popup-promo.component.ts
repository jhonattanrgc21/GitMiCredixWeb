import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-popup-promo',
  templateUrl: './popup-promo.component.html',
  styleUrls: ['./popup-promo.component.scss']
})
export class PopupPromoComponent implements OnInit, OnDestroy {

  constructor(public dialogRef: MatDialogRef<PopupPromoComponent>) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
  }
}
