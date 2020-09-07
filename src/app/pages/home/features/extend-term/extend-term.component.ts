import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {ModalService} from '../../../../core/services/modal.service';
import {Router} from '@angular/router';
import {StorageService} from '../../../../core/services/storage.service';
import {ConvertStringDateToDate} from '../../../../shared/utils';

@Component({
  selector: 'app-extend-term',
  templateUrl: './extend-term.component.html',
  styleUrls: ['./extend-term.component.scss'],
})
export class ExtendTermComponent implements OnInit {
  tableHeaders = [
    {label: 'Consumos', width: '30%'},
    {label: 'Ampliación', width: '70%'}
  ];
  optionsScroll = {autoHide: false, scrollbarMinSize: 100};
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


  quotaSelected;
  quotas = 6;
  options = [];
  allowedMovements;
  quotaList;
  message = 'El plazo de su compra ha sido extendido correctamente.';
  resType = 'success';
  showResponse = false;
  currencyCode = '$';
  empty = false;
  quotasArray;
  quotaSliderStep = 1;
  quotaSliderMin = 3;
  quotaSliderMax = 12;
  quotaSliderDisplayMin = 1;
  quotaSliderDisplayMax = 12;
  quotaSliderDisplayValue = 0;

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
    this.getQuotas();
    this.quotaSelected = this.quotasArray[0];
  }

  getQuota(sliderValue) {
    this.quotaSliderDisplayValue = this.quotasArray[sliderValue - 1].quotaTo;
    this.quotas = this.quotaSliderDisplayValue;
    this.quotaSelected = this.quotasArray[sliderValue - 1];
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

  getQuotas() {
    this.quotasArray = this.optionSelected.subOptions.sort((a, b) => a.quota - b.quota);
    this.quotaSliderDisplayMin = this.quotasArray[0].quotaTo;
    this.quotaSliderMin = 1;
    this.quotaSliderDisplayMax = this.quotasArray[this.quotasArray.length - 1].quotaTo;
    this.quotaSliderMax = this.quotasArray.length;
    this.quotaSliderDisplayValue = this.quotaSliderDisplayMin;
  }
}
