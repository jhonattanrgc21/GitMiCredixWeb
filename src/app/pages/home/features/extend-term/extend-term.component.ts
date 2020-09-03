import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';
import { ModalService } from '../../../../core/services/modal.service';
import { Router } from '@angular/router';
import { StorageService } from '../../../../core/services/storage.service';
import { ConvertStringDateToDate } from '../../../../shared/utils';



@Component({
  selector: 'app-extend-term',
  templateUrl: './extend-term.component.html',
  styleUrls: ['./extend-term.component.scss'],
})
export class ExtendTermComponent implements OnInit {
  tableHeaders = [
    { label: 'Consumos', width: '30%' },
    { label: 'Ampliación', width: '70%' }
  ];
  optionsScroll = { autoHide: false, scrollbarMinSize: 100 };
  optionSelected = {
    id: 0,
    name: '',
    icon: '',
    img: '',
    cardId: 0,
    totalPlanQuota: 0,
    accountNumber: 0,
    movementId: '',
    originDate: '',
    originAmount: '',
    originCurrency: '',
    quotaAmount: 0,
    subOptions: [],
    restrictions: {
      linkFacebook: '',
      name: '',
      paymentPlaceRestriction: [],
      webPage: '',
    },
  };

  changedQuotas = {
    feeAmount: '0',
    feePercentage: 0,
    quotaTo: 6,
    amountPerQuota: '0',
    quotaFrom: 3,
    financedPlan: 0,
    purchaseAmount: '0',
  };


  quotaSelected = {
    feeAmount: '0',
    feePercentage: 0,
    quotaTo: 6,
    amountPerQuota: '0',
    quotaFrom: 3,
    financedPlan: 0,
    purchaseAmount: '0',
  };

  quotas = 6;
  options = [];
  allowedMovements;
  quotaList;
  message = 'El plazo de su compra ha sido extendido correctamente.';
  resType = 'success';
  showResponse = false;
  currencyCode = '$';
  empty = false;
  movLength;

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

  getOptionDetail(option) {
    this.optionSelected = option;
    this.changedQuotas = this.optionSelected.subOptions.find(
      (el) => el.quotaTo === this.quotas
    );
    this.quotaSelected = this.changedQuotas
  }

  changeQuotas(e) {
    this.quotas = e;
    this.changedQuotas = this.optionSelected.subOptions.find(
      (el) => el.quotaTo === e
    );
    this.quotaSelected = this.changedQuotas;

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
          this.movLength = res.result.length

          this.allowedMovements.forEach(async (elem, i) => {
            this.quotaList = await this.calculateQuota(elem.movementId, i);
            const quotaAmount = this.changeFormat(elem.originAmount) / elem.totalPlanQuota;
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

  convertStringDateToDate(value: string): Date {
    return ConvertStringDateToDate(value);
  }

  changeFormat(value) {
    const removeDot = value.replace('.', '');
    const finalString = removeDot.replace(',', '.');
    return Number(finalString);
  }


  calculateQuota(movementId, i) {
    this.httpService
      .post('canales', 'channels/quotacalculator', {
        movementId,
      })
      .subscribe((res) => {
        if (res.type === 'success') {
          this.options[i] = { ...this.options[i], subOptions: res.listQuota };
          if (i === this.movLength - 1) {
            if (this.router.parseUrl(this.router.url).queryParams.q && this.options.length) {
              const movementId = this.router.parseUrl(this.router.url).queryParams.q;
              const option = this.options.find(mov => mov.movementId == movementId);
              if (option) {
                this.getOptionDetail(option);
              }
            }
          }
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
