import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Receipt} from '../../../../../../shared/models/receipt';
import {TagsService} from '../../../../../../core/services/tags.service';
import {Tag} from '../../../../../../shared/models/tag';

@Component({
  selector: 'app-popup-all-receipts',
  templateUrl: './popup-all-receipts.component.html',
  styleUrls: ['./popup-all-receipts.component.scss']
})
export class PopupAllReceiptsComponent implements OnInit {
  receipts: Receipt[] = [];
  validateAntiquity: string;
  companyName: string;
  popupTagsReceipt: {
    subtitle1: string;
    subtitle2: string;
    subtitle3: string;
    subtitle4: string;
    tag1: string;
    tag2: string;
    tag3: string;
    tag4: string;
    tag5: string;
    tag6: string;
    tag7: string;
    tag8: string;
    tag9: string;
    tag10: string;
    tag11: string;
    tag12: string;
    tag13: string;
    tag14: string;
    tag15: string;
    tag16: string;
    estateValue: string;
    disclaimer: string;
    tipeValue: string;
    cajeroValue: string;
  };

  constructor(public dialogRef: MatDialogRef<PopupAllReceiptsComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData,
              private tagsService: TagsService) {
  }

  ngOnInit(): void {
    this.receipts = this.dialogData.data.receipts;
    this.validateAntiquity = this.dialogData.data.validateAntiquity;
    this.companyName = this.dialogData.data.companyName;
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Servicios').tags)
    );

  }

  getReceiptToPay(receipt: Receipt) {
    this.dialogRef.close(receipt);
  }

  getOldReceipt(receipt: Receipt) {
    if (receipt) {
      this.dialogRef.close(receipt);
    }
  }

  getTags(tags: Tag[]) {
    this.popupTagsReceipt = {
      subtitle1: tags.find(tag => tag.description === 'servicios.popup.subtitle1')?.value,
      subtitle2: tags.find(tag => tag.description === 'servicios.popup.subtitle2')?.value,
      subtitle3: tags.find(tag => tag.description === 'servicios.popup.subtitle3')?.value,
      subtitle4: tags.find(tag => tag.description === 'servicios.popup.subtitle4')?.value,
      tag1: tags.find(tag => tag.description === 'servicios.popup.tag1')?.value,
      tag2: tags.find(tag => tag.description === 'servicios.popup.tag2')?.value,
      tag3: tags.find(tag => tag.description === 'servicios.popup.tag3')?.value,
      tag4: tags.find(tag => tag.description === 'servicios.popup.tag4')?.value,
      tag5: tags.find(tag => tag.description === 'servicios.popup.tag5')?.value,
      tag6: tags.find(tag => tag.description === 'servicios.popup.tag6')?.value,
      tag7: tags.find(tag => tag.description === 'servicios.popup.tag7')?.value,
      tag8: tags.find(tag => tag.description === 'servicios.popup.tag8')?.value,
      tag9: tags.find(tag => tag.description === 'servicios.popup.tag9')?.value,
      tag10: tags.find(tag => tag.description === 'servicios.popup.tag10')?.value,
      tag11: tags.find(tag => tag.description === 'servicios.popup.tag11')?.value,
      tag12: tags.find(tag => tag.description === 'servicios.popup.tag12')?.value,
      tag13: tags.find(tag => tag.description === 'servicios.popup.tag13')?.value,
      tag14: tags.find(tag => tag.description === 'servicios.popup.tag14')?.value,
      tag15: tags.find(tag => tag.description === 'servicios.popup.tag15')?.value,
      tag16: tags.find(tag => tag.description === 'servicios.popup.tag16')?.value,
      cajeroValue: tags.find(tag => tag.description === 'servicios.popup.cajeroValue')?.value,
      disclaimer: tags.find(tag => tag.description === 'servicios.popup.disclaimer')?.value,
      estateValue: tags.find(tag => tag.description === 'servicios.popup.estadoValue')?.value,
      tipeValue: tags.find(tag => tag.description === 'servicios.popup.TipoValue')?.value
    };
  }
}
