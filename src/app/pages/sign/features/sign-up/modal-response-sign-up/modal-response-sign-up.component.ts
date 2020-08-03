import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-response-sign-up',
  templateUrl: './modal-response-sign-up.component.html',
  styleUrls: ['./modal-response-sign-up.component.scss']
})
export class ModalResponseSignUpComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalResponseSignUpComponent>, @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close();
  }

}
