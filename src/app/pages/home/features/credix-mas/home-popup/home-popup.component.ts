import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-home-popup',
  templateUrl: './home-popup.component.html',
  styleUrls: ['./home-popup.component.scss']
})
export class HomePopupComponent implements OnInit {

  credixMasTitle: string;
  credixMasText: string;
  constructor(public dialogRef: MatDialogRef<HomePopupComponent>, @Inject(MAT_DIALOG_DATA) public dataModal) {
    const { data } = dataModal;
    const { credixMasTitle, credixMasText } = data;
    this.credixMasTitle = credixMasTitle;
    this.credixMasText = credixMasText;
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
}
