import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-subscribe-popup',
  templateUrl: './subscribe-popup.component.html',
  styleUrls: ['./subscribe-popup.component.scss']
})
export class SubscribePopupComponent implements OnInit {

  subscription: boolean;
  date: string;
  constructor(public dialogRef: MatDialogRef<SubscribePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public dataModal) {
      const { data } = dataModal;
      const {subscription, date} = data;
      this.subscription = subscription;
      this.date = date;
  }


  ngOnInit(): void {
  }

  confirm(result: boolean){
    return this.dialogRef.close(result);
  }

}
