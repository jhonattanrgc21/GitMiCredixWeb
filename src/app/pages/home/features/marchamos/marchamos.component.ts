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
  vehicleInformation: boolean;
  value = 1;
  quotesAmount: number;
  amountItemsProducts: { responsabilityCivilAmount: number, roadAsistanceAmount: number, moreProtectionAmount: number } = {
    responsabilityCivilAmount: 8745.00,
    roadAsistanceAmount: 3359.00,
    moreProtectionAmount: 7140.00
  };
  commission = 0;
  responseToContinue: string;
  contactToConfirm: { name: string, email: string, phone: string } = {
    name: '',
    email: '',
    phone: ''
  };
  placeOfRetreat: { placeDescription: string } = {
    placeDescription: ''
  };
  dataForPayResumen: any[] = [];
  dataPayResume: { totalMount: any, totalAmountItemsProducts: number, iva: number, commission: number } =
    {
      totalMount: 0,
      totalAmountItemsProducts: 0,
      iva: 0,
      commission: 0
    };
  stepperIndex = 0;
  iva = 0;
  totalAmountItemsProducts = 0;
  cardId: number;
  addressAplicant: any[] = [];
  informationApplicant: any;
  promoStatus: any;
  responseResultPay = false;
  email: string;
  ownerEmail: string;
  quotasId = 0;
  isPickUpStore = false;
  resultPay: { messageToPay: string, responseToPay: string, titleToPay: string };
  dataPay: { totalMount: any, value: number, plateNumber: string, firstCouteToPayIn: string };
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
    /* this.getOwnersPayerInfo();
     this.getPromo();
     this.getCardValues();
     this.getUserAplicantAccountNumber();*/
    this.totalAmountItemsProducts = this.amountItemsProducts.responsabilityCivilAmount +
      this.amountItemsProducts.roadAsistanceAmount + this.amountItemsProducts.moreProtectionAmount;
  }

  getUserAplicantAccountNumber() {
    this.httpService.post('canales', 'applicant/finduserapplicantaccountnumber', {
      channelId: 102,
      accountNumber: this.storageService.getCurrentUser().accountNumber
    }).subscribe(response => {
      this.email = response.informationApplicant.applicant.email;
      this.informationApplicant = response.informationApplicant.applicant;
      this.addressAplicant = response.informationApplicant.applicant.addressApplicant;
    });
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
        break;
    }
  }

  getCardValues() {
    this.storageService.getCurrentCards().forEach(cardValues => {
      this.cardId = cardValues.cardId;
    });
  }

  //   if (event.newDirection) {
  //     this.placeOfRetreat = {
  //       placeDescription: event.data.exactlyDirection,
  //     };
  //     this.contactToConfirm = {
  //       name: event.data.personReceive,
  //       email: this.pickUpControls.email.value,
  //       phone: event.data.phoneNumber
  //     };
  //   }
  // }

  getAnotherPay(event) {
    this.responseResultPay = event;
  }

  consult() {
    this.marchamosService.consult();
  }

  /*consult() {
    this.httpService.post('marchamos', 'pay/vehicleconsult', {
      channelId: 107,
      plateClassId: this.consultControls.vehicleType.value.toString(),
      plateNumber: this.consultControls.plateNumber.value.toUpperCase(),
      aditionalProducts: [
        {
          productCode: 5
        },
        {
          productCode: 6
        },
        {
          productCode: 8
        }
      ]
    }).subscribe(response => {
      this.consultVehicle = response.REQUESTRESULT.soaResultVehicleConsult.header;
      this.totalMount = response.REQUESTRESULT.soaResultVehicleConsult.header.amount;
      this.billingHistorys = response.REQUESTRESULT.soaResultVehicleConsult.item;
      this.quotesAmount = typeof this.totalMount === 'string' ? +this.totalMount.replace('.', '') : this.totalMount;
      this.vehicleInformation = response.type === 'success' ? !this.vehicleInformation : this.vehicleInformation;
    });
  }*/

  getOwnersPayerInfo() {
    this.httpService.post('marchamos', 'owners/payerinfo', {
      channelId: 107,
      payerId: null,
      accountNumber: this.storageService.getCurrentUser().accountNumber
    })
      .subscribe(response => {
        this.ownerPayer = response.REQUESTRESULT.soaResultPayerInfo.header;
        this.ownerEmail = this.ownerPayer.email;
      });
  }

  getPromo() {
    this.httpService.post('marchamos', 'pay/promoapply',
      {
        channelId: 107,
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
        aditionalProducts: [],
        amount: this.consultVehicle.amount,
        cardNumber: this.cardId,
        deliveryPlaceId: (this.pickUpControls.pickUp.value === '') ? 1 : this.pickUpControls.pickUp.value,
        authenticationNumberCommission: '0000',
        authenticationNumberMarchamo1: '000000',
        domicilePerson: this.contactToConfirm.name,
        domicilePhone: this.contactToConfirm.phone,
        domicilePlace: this.placeOfRetreat.placeDescription,
        email: (this.email !== null) ? this.email : this.ownerEmail,
        ownerEmail: (this.email !== null) ? this.email : this.ownerEmail,
        extraCardStatus: '0',
        firstPayment: this.promoStatus.paymentDate,
        payId: this.consultVehicle.payId,
        payerId: this.ownerPayer.payerId,
        period: this.consultVehicle.period,
        phoneNumber: this.consultVehicle.contactPhone,
        plateClassId: +this.consultControls.vehicleType.value,
        plateNumber: this.consultControls.plateNumber.value.toUpperCase(),
        promoStatus: this.promoStatus.promoStatusId,
        quotasId: this.quotasId,
        transactionTypeId: 1,
        requiredBill: '1'
      })
      .subscribe(response => {
        if (response.type) {
          this.responseResultPay = !this.responseResultPay;
        }
        this.resultPay = {
          messageToPay: response.message,
          responseToPay: response.type,
          titleToPay: response.title
        };

        this.dataPay = {
          totalMount: this.consultVehicle.amount,
          value: this.value,
          plateNumber: this.consultVehicle.plateNumber,
          firstCouteToPayIn: this.secureAndQuotesControls.firstCouteToPayIn.value
        };
      });
  }

  confirmModal() {
    this.modalService.confirmationPopup('¿Desea realizar este pago?').subscribe(event => {
      if (event) {
        this.secureToPay();
      }
    });
  }

  getValuesSecondStep() {
    if (this.secureAndQuotesForm.value) {
      this.continue();
    }
  }

  getValuesThirstyStep() {
    this.continue();
    this.dataPayResume = {
      totalMount: this.consultVehicle.amount,
      totalAmountItemsProducts: this.totalAmountItemsProducts,
      commission: this.commission,
      iva: this.iva
    };
    if (this.isPickUpStore) {
      this.isPickUp();
    }
  }

  private isPickUp() {
    switch (this.pickUpControls.pickUp.value) {
      case 1:
        this.placeOfRetreat = {
          placeDescription: 'SUCURSAL TIBÁS'
        };
        break;
      case 2:
        this.placeOfRetreat = {
          placeDescription: 'SUCURSAL BELÉN'
        };
        break;
      case 3:
        this.placeOfRetreat = {
          placeDescription: 'SUCURSAL ESCAZÚ'
        };
        break;
      case 4:
        this.placeOfRetreat = {
          placeDescription: 'SUCURSAL TIBÁS'
        };
        break;
      case 5:
        this.placeOfRetreat = {
          placeDescription: 'SUCURSAL DESAMPARADOS'
        };
        break;
      case 7:
        this.placeOfRetreat = {
          placeDescription: 'ADMINISTRATIVO'
        };
        break;
    }
  }

}


