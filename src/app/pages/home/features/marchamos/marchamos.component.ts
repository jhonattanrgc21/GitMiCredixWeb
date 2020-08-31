import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpService} from 'src/app/core/services/http.service';
import {ModalService} from 'src/app/core/services/modal.service';
import {CdkStepper} from '@angular/cdk/stepper';
import {StorageService} from 'src/app/core/services/storage.service';
import {OwnerPayer} from 'src/app/shared/models/ownerPayer.model';
import {BillingHistory} from 'src/app/shared/models/billingHistory.models';
import {MarchamosService} from './marchamos.service';
import {ConsultVehicle} from '../../../../shared/models/consultVehicle.models';

@Component({
  selector: 'app-marchamos',
  templateUrl: './marchamos.component.html',
  styleUrls: ['./marchamos.component.scss']
})
export class MarchamosComponent implements OnInit {
  ownerPayer: OwnerPayer;
  billingHistories: BillingHistory[];
  consultVehicle: ConsultVehicle;
  responseToPay: {
    messageToPay: string,
    responseToPay: string,
    totalMount: number,
    quotas: number,
    plateNumber: string,
    firstCouteToPayIn: string
  } = {
    messageToPay: '',
    responseToPay: '',
    totalMount: 0,
    quotas: 0,
    plateNumber: '',
    firstCouteToPayIn: ''
  };
  amountItemsProducts: { responsabilityCivilAmount: number, roadAsistanceAmount: number, moreProtectionAmount: number } = {
    responsabilityCivilAmount: 8745.00,
    roadAsistanceAmount: 3359.00,
    moreProtectionAmount: 7140.00
  };
  commission = 0;
  stepperIndex = 0;
  iva = 0;
  private domicile: { person: string, phone: number, place: string } = {
    person: '',
    phone: 0,
    place: ''
  };
  totalAmountItemsProducts = 0;
  cardId: number;
  informationApplicant: any;
  promoStatus: any;
  responseResultPay = false;
  options = {autoHide: false, scrollbarMinSize: 100};
  disableButton = true;
  consultForm: FormGroup = new FormGroup({
    vehicleType: new FormControl(null, [Validators.required]),
    plateNumber: new FormControl(null, [Validators.required])
  });
  secureAndQuotesForm: FormGroup = new FormGroup({
    additionalProducts: new FormArray([]),
    quota: new FormControl(null, [Validators.required]),
    quotaId: new FormControl(null, [Validators.required]),
    firstQuotaDate: new FormControl(null, [Validators.required])
  });
  pickUpForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email]),
    pickUp: new FormControl(null, []),
    domicile: new FormArray([])
  });
  confirmForm: FormGroup = new FormGroup({
    credixCode: new FormControl(null, [Validators.required])
  });
  @ViewChild('stepper') stepper: CdkStepper;

  constructor(private httpService: HttpService,
              private marchamosService: MarchamosService,
              private modalService: ModalService,
              private storageService: StorageService) {
  }

  get consultControls() {
    return this.consultForm.controls;
  }

  get secureAndQuotesControls() {
    return this.secureAndQuotesForm.controls;
  }

  get pickUpControls() {
    return this.pickUpForm.controls;
  }

  get confirmControls() {
    return this.confirmForm.controls;
  }

  ngOnInit(): void {
    this.checkNextStep();
    this.totalAmountItemsProducts = this.amountItemsProducts.responsabilityCivilAmount +
      this.amountItemsProducts.roadAsistanceAmount + this.amountItemsProducts.moreProtectionAmount;
  }

  continue() {
    this.stepper.next();
    this.stepperIndex = this.stepper.selectedIndex;
    this.disableButton = true;
    this.checkNextStep();
  }

  back() {
    this.stepper.previous();
    this.stepperIndex = this.stepper.selectedIndex;
    this.checkNextStep();
  }

  checkNextStep() {
    switch (this.stepperIndex) {
      case 0:
        this.marchamosService.consultVehicleAndBillingHistory.subscribe(value => {
          this.consultVehicle = value.consultVehicle;
          this.billingHistories = value.billingHistories;
          this.disableButton = this.consultVehicle === null && this.billingHistories == null;
        });
        break;
      case 1:
        this.secureAndQuotesForm.valueChanges.subscribe(() => {
          this.disableButton = this.secureAndQuotesForm.invalid;
        });

        this.marchamosService.ivaAndCommission.subscribe(value => {
          this.iva = value.iva;
          this.commission = value.commission;
        });
        this.marchamosService.ownerPayerInfo.subscribe(value => {
          this.ownerPayer = value.ownerPayer;
        });
        this.getPromo();
        break;
      case 2:
        this.pickUpForm.valueChanges
          .subscribe(() => {
            this.disableButton = this.pickUpForm.invalid;
          });
        break;
      case 3:
        this.confirmForm.valueChanges
          .subscribe(() => {
            this.disableButton = this.confirmForm.invalid;
          });
        this.marchamosService.domicileDescription.subscribe(value => {
            this.domicile = {
              person: value.name,
              phone: value.number,
              place: value.detail
            };
          }
        );
        break;
    }
  }

  getCardValues() {
    this.storageService.getCurrentCards().forEach(cardValues => {
      this.cardId = cardValues.cardId;
    });
  }

  getAnotherPay(event) {
    this.responseResultPay = event;
    (!this.responseResultPay) ? this.stepperIndex = 0 : this.stepperIndex = 3;
  }

  consult() {
    this.marchamosService.consult();
  }

  getPromo() {
    this.httpService.post('marchamos', 'pay/promoapply',
      {
        channelId: 102,
        accountNumber: this.storageService.getCurrentUser().accountNumber.toString()
      })
      .subscribe(response => {
        this.promoStatus = {
          promoStatusId: response.promoStatus.paymentList[0].promoStatus,
          paymentDate: response.promoStatus.paymentList[0].paymentDate
        };
      });
  }

  secureToPay() {
    this.httpService.post('marchamos', 'pay/soapay',
      {
        channelId: 102,
        aditionalProducts: this.secureAndQuotesControls.additionalProducts.value,
        amount: this.consultVehicle.amount,
        cardNumber: this.cardId,
        deliveryPlaceId: (this.pickUpControls.pickUp.value === null) ? 1 : this.pickUpControls.pickUp.value,
        authenticationNumberCommission: '0000',
        authenticationNumberMarchamo1: '000000',
        domicilePerson: this.domicile.person,
        domicilePhone: this.domicile.phone,
        domicilePlace: this.domicile.place,
        email: (this.pickUpControls.email.value !== null) ? this.pickUpControls.email.value : this.ownerPayer.email,
        ownerEmail: (this.pickUpControls.email.value !== null) ? this.pickUpControls.email.value : this.ownerPayer.email,
        extraCardStatus: '0',
        firstPayment: this.secureAndQuotesControls.firstQuotaDate.value,
        payId: this.consultVehicle.payId,
        payerId: this.ownerPayer.payerId,
        period: this.consultVehicle.period,
        phoneNumber: this.consultVehicle.contactPhone,
        plateClassId: +this.consultControls.vehicleType.value,
        plateNumber: this.consultControls.plateNumber.value.toUpperCase(),
        promoStatus: this.promoStatus.promoStatusId,
        quotasId: this.secureAndQuotesControls.quotaId.value,
        transactionTypeId: 1,
        requiredBill: '1'
      })
      .subscribe(response => {
        if (response.type) {
          this.responseResultPay = !this.responseResultPay;
        }
        this.responseToPay = {
          messageToPay: response.message,
          responseToPay: response.type,
          totalMount: this.consultVehicle.amount,
          quotas: this.secureAndQuotesControls.quota.value,
          plateNumber: this.consultVehicle.plateNumber,
          firstCouteToPayIn: this.secureAndQuotesControls.firstQuotaDate.value
        };
      });
  }

  confirmModal() {
    this.modalService.confirmationPopup('¿Desea realizar este pago?').subscribe(event => {
      if (event) {
        this.secureToPay();
      } else {
        this.stepperIndex = 3;
      }
    });
  }


}


