import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-credix-mas-popup',
  templateUrl: './credix-mas-popup.component.html',
  styleUrls: ['./credix-mas-popup.component.scss']
})
export class CredixMasPopupComponent implements OnInit {

  credixMasTitle: string;
  credixMasText: string;
  constructor(public dialogRef: MatDialogRef<CredixMasPopupComponent>, @Inject(MAT_DIALOG_DATA) public dataModal) {
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
