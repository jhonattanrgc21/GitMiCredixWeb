import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TagsService} from '../../../../../../core/services/tags.service';
import {Tag} from '../../../../../../shared/models/tag';

@Component({
  selector: 'app-popup-marchamos-payment-summary',
  templateUrl: './popup-marchamos-payment-summary.component.html',
  styleUrls: ['./popup-marchamos-payment-summary.component.scss']
})
export class PopupMarchamosPaymentSummaryComponent implements OnInit {
  iva = 0;
  totalAmountItemsProducts = 0;
  commission: number;
  commissionDilute: number
  comissionPorcentageDilute: string;
  marchamo: number;
  quotesToPay: { quotes: number, quotesAmount: number } = {quotes: 0, quotesAmount: 0};
  totalAmount = 0;
  resumeTag6;
  resumeTag5;
  resumeTag4;
  resumeTag3;
  resumeTag2;
  resumeTag1;
  resumeDisclaimer;

  constructor(private tagsService: TagsService,
              public dialogRef: MatDialogRef<PopupMarchamosPaymentSummaryComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
    this.data.data.forEach(values => {
      this.iva = (typeof values.iva === 'string') ? +values.iva : values.iva;
      this.commission = values.commission;
      this.commissionDilute = values.commissionDilute;
      this.comissionPorcentageDilute = values.comissionPorcentageDilute ?? '0';
      this.marchamo = (typeof values.marchamos === 'string') ? +values.marchamos.replace('.', '') : values.marchamos;
      this.quotesToPay = values.quotesToPay;
      values.itemsProductsAmount.forEach(itemProduct => {
        this.totalAmountItemsProducts = this.totalAmountItemsProducts + itemProduct.amounts;
      });
      this.totalAmount = this.roundToDecimalPlaces(this.totalAmount + this.commission + this.marchamo + this.iva + this.totalAmountItemsProducts, 2 );
    });
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Marchamo').tags)
    );
  }

  roundToDecimalPlaces(val: number, places: number): number {
    const mod: number = Math.pow(10, places);
    return Number((val * mod).toFixed(0)) / mod;
  }

  getTags(tags: Tag[]) {
    this.resumeTag4 = tags.find(tag => tag.description === 'marchamos.resumen.tag4')?.value;
    this.resumeTag2 = tags.find(tag => tag.description === 'marchamos.resumen.tag2')?.value;
    this.resumeTag1 = tags.find(tag => tag.description === 'marchamos.resumen.tag1')?.value;
    this.resumeTag3 = tags.find(tag => tag.description === 'marchamos.resumen.tag3')?.value;
    this.resumeTag5 = tags.find(tag => tag.description === 'marchamos.resumen.tag5')?.value;
    this.resumeTag6 = tags.find(tag => tag.description === 'marchamos.resumen.tag6')?.value;
    this.resumeDisclaimer = tags.find(tag => tag.description === 'marchamos.resumen.disclaimer')?.value;

  }

}
