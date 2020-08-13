import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpService} from 'src/app/core/services/http.service';
import {ModalService} from 'src/app/core/services/modal.service';
import {VehicleType} from 'src/app/shared/models/vehicleType.models';
import {CdkStepper} from '@angular/cdk/stepper';
import {MatDialogRef} from '@angular/material/dialog';
import {PopupMarchamosDetailComponent} from './popup-marchamos-detail/popup-marchamos-detail.component';
import { ConsultVehicle } from 'src/app/shared/models/consultVehicle.models';
import { Item } from 'src/app/shared/models/item.model';
import { map } from 'rxjs/operators';
import { PopupMarchamosNewDirectionComponent } from './popup-marchamos-new-direction/popup-marchamos-new-direction.component';
import { DeliveryPlace } from 'src/app/shared/models/deliveryPlace.model';
import { StorageService } from 'src/app/core/services/storage.service';
import { OwnerPayer } from 'src/app/shared/models/ownerPayer.model';
import { BillingHistory } from 'src/app/shared/models/billingHistory.models';
import { PopupMarchamosPayResumeComponent } from './popup-marchamos-pay-resume/popup-marchamos-pay-resume.component';

@Component({
  selector: 'app-marchamos',
  templateUrl: './marchamos.component.html',
  styleUrls: ['./marchamos.component.scss']
})
export class MarchamosComponent implements OnInit {

  actualDate: Date = new Date();
  vehicleType: VehicleType[];
  consultVehicle: ConsultVehicle;
  deliveryPlaces: DeliveryPlace[];
  ownerPayer: OwnerPayer;
  billingHistorys: BillingHistory[];
  itemProduct: Item[] = [
    {
      responseDescription: "Responsabilidad civil",
      responseCode: 15,
      productCode: 5
    },
    {
      responseDescription: "Asistencia en carretera",
      responseCode: 15,
      productCode: 6
    },
    {
      responseDescription: "Mas protección",
      responseCode: 15,
      productCode: 8
    }
  ];
  wishPayFirstCouteIn: any[] = [
    {
      description: 'Enero ' + (this.actualDate.getFullYear() + 1),
      value: 'enero'
    },
    {
      description: 'Febrero ' + (this.actualDate.getFullYear() + 1),
      value: 'febrero'
    },
    {
      description: 'Marzo' + (this.actualDate.getFullYear() + 1),
      value: 'marzo'
    },
    {
      description: 'Abril '+ (this.actualDate.getFullYear() + 1),
      value: 'abril'
    },
    {
      description: 'Mayo ' + (this.actualDate.getFullYear() + 1),
      value: 'mayo'
    },
    {
      description: 'Junio ' + (this.actualDate.getFullYear() + 1),
      value: 'junio'
    },
    {
      description: 'Julio ' + (this.actualDate.getFullYear() + 1),
      value: 'julio'
    },
    {
      description: 'Agosto ' + (this.actualDate.getFullYear() + 1),
      value: 'agosto'
    },
    {
      description: 'Septiembre 2020',
      value: 'septiembre'
    },
    {
      description: 'Octubre 2020',
      value: 'octubre'
    },
    {
      description: 'Noviembre 2020',
      value: 'noviembre'
    },
    {
      description: 'Diciembre 2020',
      value: 'diciembre'
    }
  ];
  newDeliveryDirection: any;
  newDeliveryOption: string;
  domicileDescription: any;

  vehicleInformation: boolean;
  totalMount:number | string;  //'₡ 114.996,00'
  value:number = 1;
  popupShowDetail: MatDialogRef<PopupMarchamosDetailComponent | any>;
  popupNewDirection: MatDialogRef<PopupMarchamosNewDirectionComponent | any>;
  popupPayResume: MatDialogRef<PopupMarchamosPayResumeComponent | any>;
  isChecked:boolean = false;
  quotesToPayOfAmount:boolean = false;
  quotesAmount: number;
  radioButtonsChangedValue: any;
  
  amountItemsProducts: any = {
    responsabilityCivilAmount: 8745.00,
    roadAsistanceAmount:3359.00,
    moreProtectionAmount:7140.00
  }
  commission: number = 0;
  responseToContinue: string;
  contactToConfirm: any = {
    name: '',
    email: '',
    phone: ''
  };
  placeOfRetreat: any = {
    placeDescription: ''
  };
  dataForPayResumen:any[] = [];
  maxQuotes: number;

  iva: number = 0;
  totalAmountItemsProducts: number = 0;
  cardNumber: string;
  addressAplicant: any[] = [];
  informationApplicant: any;
  domicile: boolean = false;
  newDomicile: boolean = false;

  options = {autoHide: false, scrollbarMinSize: 100};

  consultForm: FormGroup = new FormGroup({
    vehicleType: new FormControl('', [Validators.required]),
    plateNumber: new FormControl('', [Validators.required])
  });

  secureAndQuotesForm: FormGroup = new FormGroup({
    aditionalProducts: new FormArray([]),
    quotesToPay: new FormControl(''),
    firstCouteToPayIn: new FormControl('')
  });

  pickUpForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email]),
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
    private element: ElementRef,
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
    this.getVehicleType();
    this.getPickUpStore();
    this.getOwnersPayerInfo();
    this.getPromo();
    this.getCardValues();
    this.getUserAplicantAccountNumber();
    this.getListQuotesByProduct();
    
    // this.totalAmountItemsProducts = this.totalAmountItemsProducts + this.amountItemsProducts.roadAsistanceAmount + this.amountItemsProducts.roadAsistanceAmount + this.amountItemsProducts.moreProtectionAmount;
  }

  

  continue() {
    this.stepper.next();
  }

  allChecked(event?: any) {
    this.isChecked = event;
  }

  getCardValues(){
    this.storageService.getCurrentCards().forEach(cardValues => {
      this.cardNumber = cardValues.cardNumber;
    })
  }

  getValueSlider(event?) {
    this.value = event;
    this.getCommission(this.value);
    (event > 0) ? this.quotesAmount = this.quotesAmount / this.value : this.quotesAmount;
    this.secureAndQuotesControls.quotesToPay.patchValue(this.quotesAmount);
  }

  getValueCheckBoxes(event: any) {
    const checkArray: FormArray = this.secureAndQuotesForm.get('aditionalProducts') as FormArray;
     
      if (event.checked) {
          checkArray.push(new FormGroup({
            productCode:new FormControl(event.value)
          }));
        } else {
          let index: number = 0;
          checkArray.controls.forEach((item: FormGroup) => {
            if (item.value.productCode === event.value) {
              checkArray.removeAt(index);
              return; 
            }
            index++;
          });
    }
  }

  getValueOfCheckBoxAll(event){
    const checkArray: FormArray = this.secureAndQuotesForm.get('aditionalProducts') as FormArray;

    if (event.value === 10 && event.checked) {
      this.allChecked(event.checked); 
      for (const product of this.itemProduct) {
        checkArray.push(
          new FormGroup({
            productCode:new FormControl(product.productCode)
          }));
          checkArray.removeAt(3);
        }
    }else{
      this.allChecked(event.checked);
      checkArray.controls.splice(0, this.itemProduct.length);
      checkArray.setValue([]);
    }
  }

  getRadioButtonsChecked(event){
    this.radioButtonsChangedValue = event.value;
    if (event.value === 1 && event.checked) {
      if (this.addressAplicant[0].addressType.id === 2){
        this.domicile = true;
        this.domicileDescription = {
          name: this.informationApplicant.printName,
          detail: this.addressAplicant[0].detail,
          province: this.informationApplicant.addressApplicant[0].province.description,
          canton: this.informationApplicant.addressApplicant[0].canton.description,
          distric: this.informationApplicant.addressApplicant[0].district.description,
          number: (this.informationApplicant.phoneApplicant[0].phoneType.id === 1) ? this.informationApplicant.phoneApplicant[0].phone : ''
        }; 
      }else {
          this.newDirection();
      }
    }
  }

  newDirectionChecked(event){
    if (event.value ==='newDirection' && event.checked) {
      this.newDirection();
    }


    this.newDeliveryOption = event.value;
  }

  getListQuotesByProduct(){
    this.httpService.post('canales', 'customerservice/listquotabyproduct',{channelId: 102, productId: 2})
    .subscribe(response => { 
      this.value = response.listQuota.shift().quota;
      this.maxQuotes = response.listQuota.slice(response.listQuota.lastIndexOf())[0].quota;
      (this.value > 0) ? this.quotesToPayOfAmount = true : false;
    });
  }

  getUserAplicantAccountNumber(){
    this.httpService.post('canales', 'applicant/finduserapplicantaccountnumber', {
      channelId:102,
      accountNumber: this.storageService.getCurrentUser().accountNumber
    }).subscribe( response => {
      console.log(response);
      this.pickUpControls.email.setValue(response.informationApplicant.applicant.email);
      this.informationApplicant = response.informationApplicant.applicant;
      this.addressAplicant = response.informationApplicant.applicant.addressApplicant;
    });
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

          if (typeof this.consultVehicle.amount === 'string') {
            this.quotesAmount = parseInt(this.consultVehicle.amount.replace('.', ''));
          }else{
            this.quotesAmount = this.consultVehicle.amount;
          }

          console.log(this.quotesAmount);
            
        (response.type === 'success') ? this.vehicleInformation = !this.vehicleInformation : this.vehicleInformation;
      });
    
  }

  getOwnersPayerInfo(){
    this.httpService.post('marchamos','owners/payerinfo',{
      channelId : 107,
      payerId : null,
      accountNumber: this.storageService.getCurrentUser().accountNumber 
    })
    .subscribe(response => {
      console.log(response);
      this.ownerPayer = response.REQUESTRESULT.soaResultPayerInfo.header;
    });
  }

  getVehicleType() {
    this.httpService.post('marchamos', 'pay/platetypes', {channelId: 102})
    .subscribe(response => {
        this.vehicleType = response.plateTypesList;
    });
  }

  getPickUpStore() {
    this.httpService.post('marchamos', 'pay/deliveryplaces',{channelId: 102})
    .subscribe(response => {
      this.deliveryPlaces = response.deliveryPlacesList.filter(x => x.id !== 6);
    });
  }

  getCommission(commission:number){
    this.httpService.post('marchamos', 'pay/calculatecommission',{
      channelId: 101,
      amount:this.amountValue,
      commissionQuotasId: commission
    }).subscribe(response => { 
      console.log(response);
      switch (response.result) {
        case '10000.0':
          this.commission = 10000;
          break;
        case '20000.0':
          this.commission = 20000;
          break;
        default:
          this.commission = 0; 
          break;
      }
    });
  }

  getPromo(){
    this.httpService.post('marchamos','pay/promoapply',
    {
    channelId : 107,
    accountNumber:this.storageService.getCurrentUser().accountNumber.toString()
  })
  .subscribe(response => {console.log(response)});
  }

  secureToPay(data?) {
    this.httpService.post('marchamos', 'pay/soapay',
      {
        channelId: 101,
        aditionalProducts: this.secureAndQuotesControls.aditionalProducts.value,
        amount: this.totalMount,
        authenticationNumberCommission: this.commission.toString(),
        authenticationNumberMarchamo1: this.secureAndQuotesControls.aditionalProducts.value,
        cardNumber: this.cardNumber,
        deliveryPlaceId: (this.pickUpControls.pickUp.value === '') ? 1 : this.pickUpControls.pickUp.value,
        domicilePerson: '',
        domicilePhone: '',
        domicilePlace: '',
        email: this.pickUpControls.email.value,
        extraCardStatus: '0',
        firstPayment: 'Siguiente pago',
        ownerEmail: this.ownerPayer.email,
        payId: 'cgVJcuPB3k',
        payerId: this.ownerPayer.payerId,
        period: 2020,
        phoneNumber: 88583435,
        plateClassId: parseInt(this.consultControls.vehicleType.value),
        plateNumber: this.consultControls.plateNumber.value.toUpperCase(),
        promoStatus: 0,
        quotasId: 2,
        requiredBill: '1',
        transactionTypeId: 1
      })
      .subscribe();
  }

  showDetail() {
    this.popupShowDetail = this.modalService.open({
      component: PopupMarchamosDetailComponent,
      hideCloseButton: false,
      title: 'Detalle del marchamo',
      data:this.billingHistorys
    }, {width: 380, height: 673, disableClose: false});
    this.popupShowDetail.afterClosed();
    // .subscribe(modal => this.responseResult.message = modal.message);
  }

  newDirection(data?:any) {
    this.popupNewDirection = this.modalService.open({
      component: PopupMarchamosNewDirectionComponent,
      hideCloseButton: false,
      title:'Nueva dirección de entrega',
      data:data
    },{width: 380, height: 614, disableClose: false});
    this.popupNewDirection.afterClosed().subscribe( values => {
        this.newDeliveryDirection = {
          canton: values.canton,
          distric: values.distric,
          exactlyDirection: values.exactlyDirection,
          personReceive: values.personReceive,
          phoneNumber: values.phoneNumber,
          province: values.province
        };
      });
  }

  confirmModal(){
    this.modalService.confirmationPopup('¿Desea realizar este pago?').subscribe( event => 
      {
        console.log(event);
        
      });
  }

  payResume(){
     this.dataForPayResumen = [{
      marchamos: this.totalMount,
      itemsProductsAmount:[this.amountItemsProducts],
      commission: this.commission,
      billingHistory: this.billingHistorys,
      quotesToPay:[
        {
          quotes: this.value,
          quotesAmount: this.quotesAmount
        }
      ]    
    }];
    this.popupPayResume = this.modalService.open({
      component: PopupMarchamosPayResumeComponent,
      hideCloseButton: false,
      title: 'Resumen del pago',
      data: this.dataForPayResumen
    }, {width: 380, height: 417, disableClose: false});
    this.popupPayResume.afterClosed();
  }

  editNewDirection(edit:boolean){
    if (edit) {
      this.newDirection(this.newDeliveryDirection);  
    }
  }


  getContactToConfirm(){
    if (!this.newDeliveryDirection) {
        this.contactToConfirm = {
          name: this.domicileDescription.name,
          email: this.pickUpControls.email.value,
          phone: this.domicileDescription.number
        }
      }else if(this.newDeliveryDirection && this.newDeliveryDirection !== undefined){
        this.contactToConfirm = {
          name: this.newDeliveryDirection.personReceive,
          email: this.pickUpControls.email.value,
          phone: this.newDeliveryDirection.phoneNumber
        }
      }else{
        this.contactToConfirm;
      }
    }

    getPlaceOfRetreat(){
      console.log(this.radioButtonsChangedValue);
      (this.radioButtonsChangedValue === 2) ? this.isPickUp() : this.isDelivery();
    }

    private isPickUp(){
            switch (this.pickUpControls.pickUp.value) {
              case 1:
                this.placeOfRetreat = {
                  placeDescription: 'SUCURSAL TIBÁS'
                }
                break;
              case 2:
                this.placeOfRetreat = {
                  placeDescription: 'SUCURSAL BELÉN'
                }
                break;
                case 3:
                  this.placeOfRetreat = {
                    placeDescription: 'SUCURSAL ESCAZÚ'
                  }
                break;
                case 4:
                  this.placeOfRetreat = {
                    placeDescription: 'SUCURSAL TIBÁS'
                  }
                break;
                case 5:
                  this.placeOfRetreat = {
                    placeDescription: 'SUCURSAL DESAMPARADOS'
                  }
                  break;
                  case 7:
                    this.placeOfRetreat = {
                      placeDescription: 'ADMINISTRATIVO'
                    }
                  break;
            }
    }

    private isDelivery(){
        if (this.newDeliveryOption === 'directionRegister' || !this.newDeliveryDirection) {
          this.placeOfRetreat = {
            placeDescription: this.domicileDescription.detail
          };   
        } else if(this.newDeliveryOption === 'newDirection' && this.newDeliveryDirection){
          this.placeOfRetreat = {
            placeDescription: this.newDeliveryDirection.exactlyDirection
          };
        } else {
          return;
        }
    }

    firstStepContinue(){
      this.quotesAmount = this.quotesAmount / this.value;
      this.continue();
    }

  getValuesSecondStep(){
    if (this.secureAndQuotesForm.value) {
      console.log(this.secureAndQuotesForm.value);
      this.continue();
    }
    this.dataForPayResumen = [{
      marchamos: this.totalMount,
      itemsProductsAmount:[this.amountItemsProducts],
      commission: this.commission,
      billingHistory: this.billingHistorys,
      quotesToPay:[
        {
          quotes: this.value,
          quotesAmount: this.quotesAmount
        }
      ]    
    }];
  }

  getValuesThirstyStep(){
      console.log(this.pickUpForm.value);
      // console.log(object);
      this.continue();
      this.getContactToConfirm();
      this.getPlaceOfRetreat();
      this.dataForPayResumen.forEach(values =>{
        values.billingHistory.map(value => { (value.itemPayCode === 22 && value.itemDescription === 'IVA') ? this.iva = value.itemCurrentAmount: this.iva;});
      });
  }

  submit() {

  }
}


