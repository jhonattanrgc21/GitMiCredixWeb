import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AllowedMovement } from 'src/app/shared/models/allowed-movement';
import { Cancellation } from 'src/app/shared/models/cancellation';
import { Movement } from 'src/app/shared/models/movement';
import { PreviousMovements } from 'src/app/shared/models/previous-purchase';
import { ExtendTermService } from '../extend-term.service';
import {ConvertStringAmountToNumber} from '../../../../../shared/utils';
import {ConvertNumberToStringAmount} from '../../../../../shared/utils/convert-number-to-string-amount';
import {ModalService} from '../../../../../core/services/modal.service';
import {PopupPreviousInfoComponent} from "./popup-previous-info/popup-previous-info.component";

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
  amountArray: {amount: number, movementId: number}[] = [];
  amountSummary = '0';

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
    private extendTermService: ExtendTermService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.getAllowedMovements();
  }

  calculateTotalAmountSelect(amount: string, movementId: number, checked: boolean) {
    let totalAmount = 0;
    if (checked) {
      const amountToNumber = ConvertStringAmountToNumber(amount);
      this.amountArray.push({
        amount: amountToNumber,
        movementId
      });
    } else {
      this.amountArray.splice(this.amountArray.findIndex((obj) => obj.movementId === movementId), 1);
    }
    totalAmount = this.amountArray.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
    this.amountSummary = ConvertNumberToStringAmount(totalAmount);
  }

  change(checked: boolean, movement: PreviousMovements) {
    console.log(movement);
    this.calculateTotalAmountSelect(movement.originAmount, movement.pdqId, checked);
    checked ? this.selection.push(movement.pdqId) : this.selection
      .splice(this.selection.findIndex(mov => mov === movement.pdqId), 1);
  }

  next() {
    this.modalService.open({title: 'Recordatorio', hideCloseButton: false, component: PopupPreviousInfoComponent},
      {disableClose: true, height: 324, width: 328, panelClass: 'info'}).afterClosed()
      .subscribe(() => {
        this.extendTermService.movementsSelected = [...this.selection];
        this.route.navigate(['/home/extend-term/previous-extend']);
      });
  }

  getAllowedMovements() {
    this.extendTermService.getAllowedMovements(1005)
      .subscribe(response => {
          let previousMovements = this.consumed.consumed.map(movement => {
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
        /*if (response?.consumed && response?.consumed.length > 0) {
        } else {
          this.isEmpty = true;
        }*/
      });
  }

}
