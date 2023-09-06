import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-popup-previous-info',
  templateUrl: './popup-previous-info.component.html',
  styleUrls: ['./popup-previous-info.component.scss']
})
export class PopupPreviousInfoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<PopupPreviousInfoComponent>,) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
