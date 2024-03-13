import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CredixMasService } from '../credix-mas.service';

@Component({
  selector: 'app-rule-info-popup',
  templateUrl: './rule-info-popup.component.html',
  styleUrls: ['./rule-info-popup.component.scss']
})
export class RuleInfoPopupComponent implements OnInit {

  subscription: boolean;
  constructor(public dialogRef: MatDialogRef<RuleInfoPopupComponent>, private credixMasService: CredixMasService) {
      this.subscription = this.credixMasService.subscription
  }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close()
  }
}
