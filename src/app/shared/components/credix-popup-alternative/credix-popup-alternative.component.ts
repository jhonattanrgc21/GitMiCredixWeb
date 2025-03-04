import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-credix-popup-alternative',
  templateUrl: './credix-popup-alternative.component.html',
  styleUrls: ['./credix-popup-alternative.component.scss']
})
export class CredixPopupAlternativeComponent implements OnInit {
  options = {autoHide: false, scrollbarMinSize: 100};

  constructor(public dialogRef: MatDialogRef<CredixPopupAlternativeComponent>, @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
  }

}
