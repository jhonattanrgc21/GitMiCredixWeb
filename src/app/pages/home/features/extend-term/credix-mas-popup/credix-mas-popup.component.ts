import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-credix-mas-popup',
  templateUrl: './credix-mas-popup.component.html',
  styleUrls: ['./credix-mas-popup.component.scss']
})
export class CredixMasPopupComponent implements OnInit {

  text: string;
  constructor(public dialogRef: MatDialogRef<CredixMasPopupComponent>, @Inject(MAT_DIALOG_DATA) public dataModal) {
    const { data } = dataModal;
    const {text} = data;
    this.text = text;
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
