import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {ModalService} from '../../../../core/services/modal.service';
import {Router} from '@angular/router';
import {StorageService} from '../../../../core/services/storage.service';

@Component({
  selector: 'app-extend-term',
  templateUrl: './extend-term.component.html',
  styleUrls: ['./extend-term.component.scss'],
})
export class ExtendTermComponent implements OnInit {
  @Input() optionSelected;
  @Input() quotaSelected;
  options = [];
  allowedMovements;
  quotaList;
  message = 'El plazo de su compra ha sido extendido correctamente.';
  resType = 'success';
  showResponse = false;
  currencyCode = '$';
  empty = false;

  constructor(
    private storageService: StorageService,
    private httpService: HttpService,
    private modalService: ModalService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getAllowedMovements();
  }

  getAllowedMovements() {
    this.httpService
      .post('canales', 'channels/allowedmovements', {
        accountId: this.storageService.getCurrentUser().actId,
        cardId: this.storageService.getCurrentCards()[0].cardId,
        channelId: 102,
      })
      .subscribe((res) => {
        if (res.result.length) {
          this.allowedMovements = res.result;
          this.empty = false;

          this.allowedMovements.forEach(async (elem, i) => {
            this.quotaList = await this.calculateQuota(elem.movementId, i);
            const quotaAmount = +elem.originAmount / +elem.totalPlanQuota;
            this.options = [
              ...this.options,
              {
                id: i + 1,
                name: elem.establishmentName,
                cardId: elem.cardId,
                totalPlanQuota: elem.totalPlanQuota,
                accountNumber: elem.accountNumber,
                movementId: elem.movementId,
                originDate: elem.originDate,
                originAmount: elem.originAmount,
                originCurrency: elem.originCurrency.currency,
                quotaAmount,
              },
            ];
          });
        } else {
          this.empty = true;
        }
      });
  }

  calculateQuota(movementId, i) {
    this.httpService
      .post('canales', 'channels/quotacalculator', {
        movementId,
      })
      .subscribe((res) => {
        if (res.type === 'success') {
          this.options[i] = {...this.options[i], subOptions: res.listQuota};
        }
      });
  }

  saveQuota() {
    this.httpService
      .post('canales', 'channels/savequotification', {
        cardId: this.optionSelected.cardId,
        feeAmount: this.quotaSelected.feeAmount,
        newQuota: this.quotaSelected.quotaTo,
        statusId: 1,
        movementId: this.optionSelected.movementId,
        userIdCreate: this.storageService.getCurrentUser().userId,
      })
      .subscribe((res) => {
        this.resType = res.type;
        this.message = res.message;
      });
  }

  openConfirmationModal() {
    if (this.quotaSelected) {
      this.modalService
        .confirmationPopup('¿Desea ampliar el plazo de este pago?')
        .subscribe((res) => {
          if (res) {
            this.showResponse = true;
            this.saveQuota();
          }
        });
    }
  }

  done() {
    this.router.navigate(['/home']);
  }
}
