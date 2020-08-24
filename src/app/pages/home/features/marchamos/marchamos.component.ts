import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpService} from 'src/app/core/services/http.service';
import {ModalService} from 'src/app/core/services/modal.service';
import {CdkStepper} from '@angular/cdk/stepper';
import {ConsultVehicle} from 'src/app/shared/models/consultVehicle.models';
import {StorageService} from 'src/app/core/services/storage.service';
import {OwnerPayer} from 'src/app/shared/models/ownerPayer.model';
import {BillingHistory} from 'src/app/shared/models/billingHistory.models';

@Component({
  selector: 'app-marchamos',
  templateUrl: './marchamos.component.html',
  styleUrls: ['./marchamos.component.scss']
})
export class MarchamosComponent implements OnInit {

 
  consultVehicle: ConsultVehicle;
  ownerPayer: OwnerPayer;
  billingHistorys: BillingHistory[];
  
  newDeliveryDirection: any;

  vehicleInformation: boolean;
  totalMount: any;  //'₡ 114.996,00'
  value: number = 1;
  quotesAmount: number;

  amountItemsProducts: {responsabilityCivilAmount:number, roadAsistanceAmount: number, moreProtectionAmount:number} = {
    responsabilityCivilAmount: 8745.00,
    roadAsistanceAmount: 3359.00,
    moreProtectionAmount: 7140.00
  };
  commission: number = 0;
  responseToContinue: string;
  contactToConfirm: {name:string,email: string, phone:string} = {
    name: '',
    email: '',
    phone: ''
  };
  placeOfRetreat: {placeDescription: string} = {
    placeDescription: ''
  };
  dataForPayResumen: any[] = [];
  dataPayResume:{totalMount: any, totalAmountItemsProducts: number, iva: number, commission: number} =
  {
    totalMount:0,
    totalAmountItemsProducts:0,
    iva:0,
    commission:0
  };
  stepperIndex: number = 0;
  // maxQuotes: number;
  // minQuotes: number;

  iva: number = 0;
  totalAmountItemsProducts: number = 0;
  cardNumber: string;
  addressAplicant: any[] = [];
  informationApplicant: any;
  // domicile: boolean = false;
  // newDomicile: boolean = false;
  promoStatus: any;
  responseResultPay: boolean = false;
  responseToPay: string;
  messageToPay: string;
  titleToPay: string;
  email: string;

  isPickUpStore:boolean = false;

  resultPay:{messageToPay: string, responseToPay:string, titleToPay:string};
  dataPay: {totalMount:any, value:number,plateNumber:string,firstCouteToPayIn: string}


  options = {autoHide: false, scrollbarMinSize: 100};

  consultForm: FormGroup = new FormGroup({
    vehicleType: new FormControl('', [Validators.required]),
    plateNumber: new FormControl('', [Validators.required])
  });

  secureAndQuotesForm: FormGroup = new FormGroup({
    aditionalProducts: new FormArray([],{validators: Validators.required}),
    quotesToPay: new FormControl(''),
    firstCouteToPayIn: new FormControl('', [Validators.required])
  });

  pickUpForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    pickUp: new FormControl('', []),
    domicile: new FormArray([])
  });

  confirmForm: FormGroup = new FormGroup({
    credixCode: new FormControl('', [Validators.required])
  });


  @ViewChild('stepper') stepper: CdkStepper;

  constructor(
    private httpService: HttpService,
    private modalService: ModalService,
    private storageService: StorageService
  ) {
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

  get amountValue() {
    return this.totalMount;
  }


  ngOnInit(): void {  
    this.getOwnersPayerInfo();
    this.getPromo();
    this.getCardValues();
    this.getUserAplicantAccountNumber();
    // this.getListQuotesByProduct();
    this.totalAmountItemsProducts = this.amountItemsProducts.responsabilityCivilAmount + this.amountItemsProducts.roadAsistanceAmount + this.amountItemsProducts.moreProtectionAmount;

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
  }

  

  getCardValues() {
    this.storageService.getCurrentCard().forEach(cardValues => {
      this.cardNumber = cardValues.cardNumber;
    });
  }

  getDataOfQuotes(event){
    this.commission = event.commission;
    this.iva = event.iva;
    this.value = event.quotes;
  }

  getDataOfDelivery(event){
    console.log(event);
    this.isPickUpStore = event.isPickUpStore;

    if (this.isPickUpStore) {
      this.contactToConfirm =  {
        name: event.data.name,
        email:this.pickUpControls.email.value,
        phone:event.data.number
      }
    }else {
      this.contactToConfirm = {
        name: event.data.name,
        email:this.pickUpControls.email.value,
        phone:event.data.number
      }
      this.placeOfRetreat = {
        placeDescription: event.data.detail
      }
    }

    if(event.newDirection) {
      this.placeOfRetreat = {
        placeDescription: event.data.exactlyDirection,
      }
      this.contactToConfirm = {
        name: event.data.personReceive,
        email:this.pickUpControls.email.value,
        phone: event.data.phoneNumber
      }
    }
  }


  getAnotherPay(event){
    this.responseResultPay = event;
  }

  consult() {
    this.httpService.post('marchamos', 'pay/vehicleconsult', {
      channelId: 107,
      plateClassId: this.consultControls.vehicleType.value.toString(),
      plateNumber: this.consultControls.plateNumber.value.toUpperCase(),
      aditionalProducts: [
        ''
      ]
    })
      .subscribe(response => {
        console.log(response);
        this.consultVehicle = response.REQUESTRESULT.soaResultVehicleConsult.header;
        this.totalMount = response.REQUESTRESULT.soaResultVehicleConsult.header.amount;
        this.billingHistorys = response.REQUESTRESULT.soaResultVehicleConsult.item;
        this.responseToContinue = response.type;
        (typeof this.totalMount === 'string') ? this.quotesAmount = parseInt(this.totalMount.replace('.', '')) : this.quotesAmount = this.totalMount;
        (response.type === 'success') ? this.vehicleInformation = !this.vehicleInformation : this.vehicleInformation;
        
     
      });

  }

  getOwnersPayerInfo() {
    this.httpService.post('marchamos', 'owners/payerinfo', {
      channelId: 107,
      payerId: null,
      accountNumber: this.storageService.getCurrentUser().accountNumber
    })
      .subscribe(response => {
        console.log(response);
        this.ownerPayer = response.REQUESTRESULT.soaResultPayerInfo.header;
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
        channelId: 107,
        aditionalProducts: [],
        amount: (typeof this.totalMount === 'string') ? parseInt(this.totalMount.replace('.', '')) : this.totalMount,
        cardNumber: this.cardNumber,
        deliveryPlaceId: (this.pickUpControls.pickUp.value === '') ? 1 : this.pickUpControls.pickUp.value,
        domicilePerson: this.contactToConfirm.name,
        domicilePhone: this.contactToConfirm.phone,
        domicilePlace: this.placeOfRetreat.placeDescription,
        email: this.pickUpControls.email.value,
        extraCardStatus: '0',
        firstPayment: this.promoStatus.paymentDate,
        payId: this.consultVehicle.payId,
        payerId: this.ownerPayer.payerId,
        period: this.consultVehicle.period,
        phoneNumber: this.consultVehicle.contactPhone,
        plateClassId: parseInt(this.consultControls.vehicleType.value),
        plateNumber: this.consultControls.plateNumber.value.toUpperCase(),
        promoStatus: this.promoStatus.promoStatusId,
        quotas: this.value,
        transactionTypeId: 1
      })
      .subscribe(response => {
        console.log(response);
        if (response.type) {
          this.responseResultPay = !this.responseResultPay;
        }
        this.resultPay ={
          messageToPay: response.message,
          responseToPay: response.type,
          titleToPay: response.title
        }

        this.dataPay = {
          totalMount:this.totalMount,
          value: this.value,
          plateNumber: this.consultVehicle.plateNumber,
          firstCouteToPayIn: this.secureAndQuotesControls.firstCouteToPayIn.value
        }
      });
  }


  confirmModal() {
    this.modalService.confirmationPopup('¿Desea realizar este pago?').subscribe(event => {
      if (event) {
        this.secureToPay();
      }
    });
  }


  firstStepContinue() {
    this.quotesAmount = this.quotesAmount / this.value;
    this.continue();
    
  }

  getValuesSecondStep() {
    if (this.secureAndQuotesForm.value) {
      console.log(this.secureAndQuotesForm.value);
      this.continue();
    }
  }

  getValuesThirstyStep() {
    console.log(this.pickUpForm.value);
    this.continue();
      this.dataPayResume = {
        totalMount:this.totalMount,
        totalAmountItemsProducts: this.totalAmountItemsProducts,
        commission:this.commission,
        iva: this.iva
    }
    if (this.isPickUpStore) {
      this.isPickUp();  
    }
  }


  private isPickUp() {
    switch (this.pickUpControls.pickUp.value) {
      case 1: this.placeOfRetreat = {
        placeDescription:'SUCURSAL TIBÁS'
      }
      break;
      case 2:
        this.placeOfRetreat = {
          placeDescription:'SUCURSAL BELÉN'
      }
      break;
      case 3:
        this.placeOfRetreat = {
          placeDescription:'SUCURSAL ESCAZÚ'
        }
        break;
      case 4:
        this.placeOfRetreat = {
        placeDescription: 'SUCURSAL TIBÁS'
      }
      break;
      case 5:this.placeOfRetreat = {
        placeDescription: 'SUCURSAL DESAMPARADOS'
      }
      break;
      case 7:
        this.placeOfRetreat = {
          placeDescription:'ADMINISTRATIVO'
        }
        break;
    }
  }

}


