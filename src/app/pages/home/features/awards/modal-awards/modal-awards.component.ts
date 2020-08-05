import { Component, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-awards',
  templateUrl: './modal-awards.component.html',
  styleUrls: ['./modal-awards.component.scss'],
})
export class ModalAwardsComponent implements OnInit {
  @ViewChild('footer') footer: TemplateRef<any>;
  currentAward: number;
  awardLength = 0;
  award;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ModalAwardsComponent>
  ) {
    this.currentAward = this.data.data.id;
    this.awardLength = this.data.data.array.length;
    this.award = this.data.data.array[this.currentAward];
  }

  ngOnInit(): void {

  }


  ngAfterViewInit(): void {
    this.data.footer = this.footer;
  }

  back() {
    this.currentAward = this.currentAward - 1;
    this.award = this.data.data.array[this.currentAward];

  }

  next() {
    this.currentAward = this.currentAward + 1;
    this.award = this.data.data.array[this.currentAward];
  }

}
