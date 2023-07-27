import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-credix-popup-promo',
  templateUrl: './credix-popup-promo.component.html',
  styleUrls: ['./credix-popup-promo.component.scss']
})
export class CredixPopupPromoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CredixPopupPromoComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

}
