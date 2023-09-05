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
  isEmpty: boolean = false;
  previousMovements: PreviousMovements[] = [];
  private consumed = {
    consumed: [
      {
        originAmount: '60.600,00',
        pdqId: 186103963,
        originCurrency: {
          currencyDescription: 'Colones',
          currency: '¢',
          currencyId: 188
        },
        establishmentName: 'IMP MONGE TIENDA 36 CARTAGO-CIA COMERCIA',
        totalPlanQuota: 2,
        originDate: '01/02/2020'
      },
      {
        originAmount: '115.866,66',
        pdqId: 186103965,
        originCurrency: {
          currencyDescription: 'Colones',
          currency: '¢',
          currencyId: 188
        },
        establishmentName: 'GOLLO-003 CARTAGO                       ',
        totalPlanQuota: 11,
        originDate: '08/02/2020'
      },
      {
        originAmount: '105.333,33',
        pdqId: 186244367,
        originCurrency: {
          currencyDescription: 'Colones',
          currency: '¢',
          currencyId: 188
        },
        establishmentName: 'GOLLO-003 CARTAGO                       ',
        totalPlanQuota: 10,
        originDate: '08/02/2020'
      }
    ],
    descriptionOne: 'Consulta exitosa.',
    titleOne: '¡Éxito!',
    message: 'Consulta exitosa.',
    type: 'success',
    status: 200
  };

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
    this.extendTermService.getAllowedMovements(1005)
      .subscribe(response => {
        if (response?.consumed && response?.consumed.length > 0) {
          let previousMovements = response.consumed.map(movement => {
            return {
              pdqId: movement.pdqId,
              currencySimbol: movement.originCurrency.currency,
              establishmentName: movement.establishmentName,
              originAmount: movement.originAmount,
              originDate: movement.originDate,
              quota: movement.totalPlanQuota,
            };
          });
          this.previousMovements = [...previousMovements];
        } else {
          this.isEmpty = true;
        }
      });
  }

}
