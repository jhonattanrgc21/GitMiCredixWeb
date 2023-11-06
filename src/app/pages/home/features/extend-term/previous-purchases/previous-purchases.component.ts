import {Component, OnDestroy, OnInit} from '@angular/core';
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
import {LandingService} from "../../landing/landing.service";
import {StorageService} from "../../../../../core/services/storage.service";

@Component({
  selector: 'app-previous-purchases',
  templateUrl: './previous-purchases.component.html',
  styleUrls: ['./previous-purchases.component.scss']
})
export class PreviousPurchasesComponent implements OnInit, OnDestroy {

  selection: string[] = [];
  displayedColumns: string[] = ['select', 'date', 'commerce', 'amount', 'quotas'];
  movementDataSource: Movement[] = [];
  linkTag: string;
  columnOneTag: string;
  columnTwoTag: string;
  columnThreeTag: string;
  columnFourTag: string;
  isEmpty: boolean = false;
  previousMovements: PreviousMovements[] = [];
  previousMovementsSelected: PreviousMovements[] = [];
  amountArray: {amount: number, movementId: string}[] = [];
  amountSummary = '0';
  pagoContadoColones: string;
  cardId: number;
  checkedListStates: boolean[] = [];

  private consumed = {
    consumed: [
      {
        originAmount: '60.600,00',
        pdqId: 186103964,
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
        originAmount: '60.600,00',
        pdqId: 186103963,
        originCurrency: {
          currencyDescription: 'Colones',
          currency: '¢',
          currencyId: 188
        },
        establishmentName: 'IMP MONGE TIENDA 36 CARTAGO-CIA COMERCIA',
        totalPlanQuota: 0,
        originDate: '01/02/2020'
      },
      {
        originAmount: '60.600,00',
        pdqId: 186103966,
        originCurrency: {
          currencyDescription: 'Colones',
          currency: '¢',
          currencyId: 188
        },
        establishmentName: 'IMP MONGE TIENDA 36 CARTAGO-CIA COMERCIA',
        totalPlanQuota: 1,
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
    private modalService: ModalService,
    private landingService: LandingService,
    private storageService: StorageService
  ) {
  }

  ngOnInit(): void {
    this.getAllowedMovements();
    this.cardId = this.storageService.getCurrentCards().find(card => card.category === 'Principal')?.cardId;
    this.landingService.getHomeContent(this.cardId).subscribe();
    this.landingService.pagoContadoColones.subscribe((response) => {
      console.log(response);
      this.pagoContadoColones = response;
    });
  }

  ngOnDestroy(): void {
    this.extendTermService.unsubscribe();
    this.landingService.unsubscribe();
  }

  calculateTotalAmountSelect(amount: string, movementId: string, checked: boolean) {
    let totalAmount = 0;
    if (checked) {
      const amountToNumber = ConvertStringAmountToNumber(amount);
      if (this.amountArray.findIndex((obj) => obj.movementId === movementId) === -1) {
        this.amountArray.push({
          amount: amountToNumber,
          movementId
        });
      }
    } else {
      this.amountArray.splice(this.amountArray.findIndex((obj) => obj.movementId === movementId), 1);
    }
    totalAmount = this.amountArray.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
    this.amountSummary = ConvertNumberToStringAmount(totalAmount);
  }

  change(checked: boolean, movement: PreviousMovements, i: number) {
    this.calculateTotalAmountSelect(movement.amount, movement.pdqId, checked);
    if (checked) {
      this.selection.push(movement.pdqId);
      this.checkedListStates[i] = true;
      this.previousMovementsSelected.push(movement);
      this.previousMovements = this.previousMovements.map((obj, index) => {
        console.log(this.checkedListStates[index]);
        return {
            pdqId: obj.pdqId,
            currencySimbol: obj.currencySimbol,
            amount: obj.amount,
            establishmentName: obj.establishmentName,
            originAmount: obj.originAmount,
            originDate: obj.originDate,
            quota: obj.quota,
            productDisable: (movement.quota === 0 || movement.quota === 1 ) && obj.quota > movement.quota && obj.quota !== 1,
            checked: this.checkedListStates[index]
          };
      });
    } else {
      this.selection
        .splice(this.selection.findIndex(mov => mov === movement.pdqId), 1);
      this.checkedListStates[i] = false;
      this.previousMovementsSelected.splice(this.previousMovementsSelected.findIndex((elem) => elem.pdqId === movement.pdqId), 1);
      this.previousMovements = this.previousMovements.map((obj, index) => {
        return {
          pdqId: obj.pdqId,
          currencySimbol: obj.currencySimbol,
          amount: obj.amount,
          establishmentName: obj.establishmentName,
          originAmount: obj.originAmount,
          originDate: obj.originDate,
          quota: obj.quota,
          productDisable: false,
          checked: this.checkedListStates[index]
        };
      });
    }
    this.extendTermService.movementsSelectedArr = this.previousMovementsSelected;
  }

  next() {
    this.modalService.open({title: 'Recordatorio', hideCloseButton: false, component: PopupPreviousInfoComponent, data: {
          amountSummary: this.amountSummary,
          pagoContado: this.pagoContadoColones
        }},
      {disableClose: true, height: 324, width: 328, panelClass: 'info'}).afterClosed()
      .subscribe(() => {
        this.extendTermService.movementsSelected = [...this.selection];
        this.extendTermService.amountSummary = this.amountSummary;
        this.extendTermService.pagoContadoColones = this.pagoContadoColones;
        this.route.navigate(['/home/extend-term/previous-extend']);
      });
  }

  getAllowedMovements() {
    this.extendTermService.getAllowedMovements(1005)
      .subscribe(response => {
        let previousMovements;
        if (response?.consumed && response?.consumed.length > 0) {
          previousMovements = response.consumed.map(movement => {
            this.checkedListStates.push(false);
            return {
              pdqId: movement.pdqId,
              amount: movement.amount,
              currencySimbol: movement.originCurrency.currency,
              establishmentName: movement.establishmentName,
              originAmount: movement.originAmount,
              originDate: movement.originDate,
              quota: movement.totalPlanQuota,
              productDisable: false,
              checked: false
            };
          });
          this.previousMovements = [...previousMovements];
        } else {
          this.isEmpty = true;
        }

      /*  if (response?.consumed && response?.consumed.length > 0) {
        } else {
          this.isEmpty = true;
        }*/
      });
  }

}
