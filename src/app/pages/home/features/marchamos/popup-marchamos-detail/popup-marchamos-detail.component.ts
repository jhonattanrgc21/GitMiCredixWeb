import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-popup-marchamos-detail',
  templateUrl: './popup-marchamos-detail.component.html',
  styleUrls: ['./popup-marchamos-detail.component.scss']
})
export class PopupMarchamosDetailComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PopupMarchamosDetailComponent>, @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
  }

}
