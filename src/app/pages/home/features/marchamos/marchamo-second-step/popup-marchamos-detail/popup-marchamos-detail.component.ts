import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BillingHistory} from 'src/app/shared/models/billing-history';
import {TagsService} from '../../../../../../core/services/tags.service';
import {Tag} from '../../../../../../shared/models/tag';

@Component({
  selector: 'app-popup-marchamos-detail',
  templateUrl: './popup-marchamos-detail.component.html',
  styleUrls: ['./popup-marchamos-detail.component.scss']
})
export class PopupMarchamosDetailComponent implements OnInit {
  billingHistorys: BillingHistory[];
  totalAmount = 0;
  popUpTagT;
  popUpTitle;

  constructor(private tagsService: TagsService,public dialogRef: MatDialogRef<PopupMarchamosDetailComponent>, @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
    this.billingHistorys = this.data.data;
    this.calculateTotalAmount();
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Marchamo').tags)
    );
  }

  getTags(tags: Tag[]) {
    this.popUpTagT = tags.find(tag => tag.description === 'marchamos.popup.tagTotal').value;
    this.popUpTitle = tags.find(tag => tag.description === 'marchamos.popup.title').value;
}

  calculateTotalAmount() {
    this.billingHistorys.forEach(values => {
      this.totalAmount = this.totalAmount + values.itemCurrentAmount;
    });
  }

}
