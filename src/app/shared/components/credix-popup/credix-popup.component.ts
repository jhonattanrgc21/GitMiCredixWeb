import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-credix-popup',
  templateUrl: './credix-popup.component.html',
  styleUrls: ['./credix-popup.component.scss']
})
export class CredixPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CredixPopupComponent>, @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
  }

}
