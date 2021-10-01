import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AllowedMovement } from 'src/app/shared/models/allowed-movement';
import { Cancellation } from 'src/app/shared/models/cancellation';
import { Movement } from 'src/app/shared/models/movement';
import { PreviousMovements } from 'src/app/shared/models/previous-purchase';
import { ExtendTermService } from '../extend-term.service';

@Component({
  selector: 'app-previous-purchases',
  templateUrl: './previous-purchases.component.html',
  styleUrls: ['./previous-purchases.component.scss']
})
export class PreviousPurchasesComponent implements OnInit {

  selection: number[] = [];
  displayedColumns: string[] = ['select', 'date', 'commerce', 'amount', 'quotas'];
  movementDataSource: Movement[] = [];
  linkTag: string;
  columnOneTag: string;
  columnTwoTag: string;
  columnThreeTag: string;
  columnFourTag: string;

  previousMovements: PreviousMovements[] = [{
    pdqId: 1,
    currencySimbol: '¢',
    establishmentName: 'Nombre del comercio 4 2342342342342342342',
    originAmount: '2000',
    originDate: '29 Oct 21',
    quota: 1,
  },
  {
    pdqId: 2,
    currencySimbol: '¢',
    establishmentName: 'Nombre del comercio',
    originAmount: '2000000',
    originDate: '29 Oct 21',
    quota: 1,
  },
  {
    pdqId: 3,
    currencySimbol: '¢',
    establishmentName: 'Nombre del comercio',
    originAmount: '2000000',
    originDate: '29 Oct 21',
    quota: 1,
  },
  {
    pdqId: 2,
    currencySimbol: '¢',
    establishmentName: 'Nombre del comercio',
    originAmount: '2000000',
    originDate: '29 Oct 21',
    quota: 1,
  },
  {
    pdqId: 3,
    currencySimbol: '¢',
    establishmentName: 'Nombre del comercio',
    originAmount: '2000000',
    originDate: '29 Oct 21',
    quota: 1,
  },
  {
    pdqId: 2,
    currencySimbol: '¢',
    establishmentName: 'Nombre del comercio',
    originAmount: '2000000',
    originDate: '29 Oct 21',
    quota: 1,
  },
  {
    pdqId: 3,
    currencySimbol: '¢',
    establishmentName: 'Nombre del comercio',
    originAmount: '2000000',
    originDate: '29 Oct 21',
    quota: 1,
  },
  {
    pdqId: 2,
    currencySimbol: '¢',
    establishmentName: 'Nombre del comercio',
    originAmount: '2000000',
    originDate: '29 Oct 21',
    quota: 1,
  },
  {
    pdqId: 3,
    currencySimbol: '¢',
    establishmentName: 'Nombre del comercio',
    originAmount: '2000000',
    originDate: '29 Oct 21',
    quota: 1,
  },
  {
    pdqId: 2,
    currencySimbol: '¢',
    establishmentName: 'Nombre del comercio',
    originAmount: '2000000',
    originDate: '29 Oct 21',
    quota: 1,
  },
  {
    pdqId: 3,
    currencySimbol: '¢',
    establishmentName: 'Nombre del comercio',
    originAmount: '2000000',
    originDate: '29 Oct 21',
    quota: 1,
  },
  {
    pdqId: 2,
    currencySimbol: '¢',
    establishmentName: 'Nombre del comercio',
    originAmount: '2000000',
    originDate: '29 Oct 21',
    quota: 1,
  },
  {
    pdqId: 3,
    currencySimbol: '¢',
    establishmentName: 'Nombre del comercio',
    originAmount: '2000000',
    originDate: '29 Oct 21',
    quota: 1,
  },
  {
    pdqId: 2,
    currencySimbol: '¢',
    establishmentName: 'Nombre del comercio',
    originAmount: '2000000',
    originDate: '29 Oct 21',
    quota: 1,
  },
  {
    pdqId: 3,
    currencySimbol: '¢',
    establishmentName: 'Nombre del comercio',
    originAmount: '2000000',
    originDate: '29 Oct 21',
    quota: 1,
  },
  {
    pdqId: 2,
    currencySimbol: '¢',
    establishmentName: 'Nombre del comercio',
    originAmount: '2000000',
    originDate: '29 Oct 21',
    quota: 1,
  },
  {
    pdqId: 3,
    currencySimbol: '¢',
    establishmentName: 'Nombre del comercio',
    originAmount: '2000000',
    originDate: '29 Oct 21',
    quota: 1,
  },
  {
    pdqId: 2,
    currencySimbol: '¢',
    establishmentName: 'Nombre del comercio',
    originAmount: '2000000',
    originDate: '29 Oct 21',
    quota: 1,
  },
  {
    pdqId: 3,
    currencySimbol: '¢',
    establishmentName: 'Nombre del comercio',
    originAmount: '2000000',
    originDate: '29 Oct 21',
    quota: 1,
  },
  {
    pdqId: 2,
    currencySimbol: '¢',
    establishmentName: 'Nombre del comercio',
    originAmount: '2000000',
    originDate: '29 Oct 21',
    quota: 1,
  },
  {
    pdqId: 3,
    currencySimbol: '¢',
    establishmentName: 'Nombre del comercio',
    originAmount: '2000000',
    originDate: '29 Oct 21',
    quota: 1,
  },
  {
    pdqId: 2,
    currencySimbol: '¢',
    establishmentName: 'Nombre del comercio',
    originAmount: '2000000',
    originDate: '29 Oct 21',
    quota: 1,
  },
  {
    pdqId: 3,
    currencySimbol: '¢',
    establishmentName: 'Nombre del comercio',
    originAmount: '2000000',
    originDate: '29 Oct 21',
    quota: 1,
  },
  {
    pdqId: 2,
    currencySimbol: '¢',
    establishmentName: 'Nombre del comercio',
    originAmount: '2000000',
    originDate: '29 Oct 21',
    quota: 1,
  },
  {
    pdqId: 3,
    currencySimbol: '¢',
    establishmentName: 'Nombre del comercio',
    originAmount: '2000000',
    originDate: '29 Oct 21',
    quota: 1,
  },
];
  
  constructor(
    private route: Router,
    private extendTermService: ExtendTermService
  ) { }

  ngOnInit(): void {
    this.getAllowedMovements();
  }

  change(checked: boolean, movement: PreviousMovements) {
    checked ? this.selection.push(movement.pdqId) : this.selection
      .splice(this.selection.findIndex(mov => mov === movement.pdqId), 1);
  }

  next() {
    this.extendTermService.movementsSelected = [...this.selection];
    this.route.navigate(['/home/extend-term/previous-extend']);
  }
  
  getAllowedMovements() {
    this.extendTermService.getAllowedMovements( 1005 )
      .subscribe(allowedMovements => {
        console.log("res: ",allowedMovements);
        
        if ( allowedMovements.length > 0 ) {
          allowedMovements.consumed.forEach(movement => {
            this.previousMovements.push({
              pdqId: movement.pdqId,
              currencySimbol: movement.originCurrency.currency,
              establishmentName:  movement.establishmentName,
              originAmount: movement.originAmount,
              originDate: movement.originDate,
              quota: movement.totalPlanQuota,
            });
          });
          console.log("allowedMovements: ", allowedMovements);
        }
      },
      err => {
        console.log("error: ", err);
      });
  }

}
