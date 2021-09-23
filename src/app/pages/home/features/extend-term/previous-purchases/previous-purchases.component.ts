import { Component, OnInit } from '@angular/core';
import { Cancellation } from 'src/app/shared/models/cancellation';
import { Movement } from 'src/app/shared/models/movement';
import { PreviousPurchase } from 'src/app/shared/models/previous-purchase';

@Component({
  selector: 'app-previous-purchases',
  templateUrl: './previous-purchases.component.html',
  styleUrls: ['./previous-purchases.component.scss']
})
export class PreviousPurchasesComponent implements OnInit {

  displayedColumns: string[] = ['select', 'date', 'commerce', 'amount', 'quotas'];
  movementDataSource: Movement[] = [];
  p = 0;
  linkTag: string;
  columnOneTag: string;
  columnTwoTag: string;
  columnThreeTag: string;
  columnFourTag: string;
  
  previousPurchases: PreviousPurchase[] = [{
    pdqId: 1,
    currencySimbol: '¢',
    establishmentName: 'Big payment!',
    originAmount: '2000',
    originDate: '29 Oct 2021',
    quota: 1,
  },
  {
    pdqId: 2,
    currencySimbol: '¢',
    establishmentName: 'La casa grande!',
    originAmount: '2000000',
    originDate: '29 Oct 2021',
    quota: 1,
  },
  {
    pdqId: 3,
    currencySimbol: '¢',
    establishmentName: 'Epa litle',
    originAmount: '2000000',
    originDate: '29 Oct 2021',
    quota: 1,
  },];
  

  constructor() { }

  ngOnInit(): void {
  }

  change(checked: boolean, cancellation: Cancellation) {
    // checked ? this.selection.push(cancellation) : this.selection
    //   .splice(this.selection.findIndex(can => can === cancellation), 1);
    // if (this.tabId === 1) {
    //   this.colonesBalance = checked ?
    //     ConvertNumberToStringAmount(
    //       ConvertStringAmountToNumber(this.colonesBalance) - ConvertStringAmountToNumber(cancellation.saldoPendiente)) :
    //     ConvertNumberToStringAmount(
    //       ConvertStringAmountToNumber(this.colonesBalance) + ConvertStringAmountToNumber(cancellation.saldoPendiente));
    // } else {
    //   this.dollarsBalance = checked ?
    //     ConvertNumberToStringAmount(
    //       ConvertStringAmountToNumber(this.dollarsBalance) - ConvertStringAmountToNumber(cancellation.saldoPendiente)) :
    //     ConvertNumberToStringAmount(
    //       ConvertStringAmountToNumber(this.dollarsBalance) + ConvertStringAmountToNumber(cancellation.saldoPendiente));
    // }
  }

}
