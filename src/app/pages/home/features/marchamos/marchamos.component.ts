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

@Component({
  selector: 'app-marchamos',
  templateUrl: './marchamos.component.html',
  styleUrls: ['./marchamos.component.scss']
})
export class MarchamosComponent implements OnInit {

  vehicleType: VehicleType[];
  consultVehicle: ConsultVehicle;
  deliveryPlaces: DeliveryPlace[];
  ownerPayer: OwnerPayer;
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
      description: 'Enero 2020',
      value: 'enero'
    },
    {
      description: 'Febrero 2020',
      value: 'febrero'
    },
    {
      description: 'Marzo 2020',
      value: 'marzo'
    },
    {
      description: 'Abril 2020',
      value: 'abril'
    },
    {
      description: 'Mayo 2020',
      value: 'mayo'
    },
    {
      description: 'Junio 2020',
      value: 'junio'
    },
    {
      description: 'Julio 2020',
      value: 'julio'
    },
    {
      description: 'Agosto 2020',
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
      description: 'diciembre 2020',
      value: 'diciembre'
    }
  ];

  newDeliveryDirection: any;
  newDeliveryOption: string;

  vehicleInformation: boolean;
  totalMount:string = '₡ 114.996,00';
  value:number = 1;
  popupShowDetail: MatDialogRef<PopupMarchamosDetailComponent>;
  popupNewDirection: MatDialogRef<PopupMarchamosNewDirectionComponent | any>;
  isChecked:boolean = false;
  quotesToPayOfAmount:boolean = false;
  radioButtonsChangedValue: any;
  amount:number = 408455;


  options = {autoHide: false, scrollbarMinSize: 100};

  consultForm: FormGroup = new FormGroup({
    vehicleType: new FormControl('', [Validators.required]),
    plateNumber: new FormControl('', [Validators.required])
  });

  secureAndQuotesForm: FormGroup = new FormGroup({
    aditionalProducts: new FormArray([]),
    quotesToPay: new FormControl('', []),
    firstCouteToPayIn: new FormControl('', [Validators.required])
  });

  pickUpForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email]),
    pickUp: new FormControl('', [])
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
    return this.amount;
  }



  ngOnInit(): void {
    this.getVehicleType();
    this.getPickUpStore();
    this.getOwnersPayerInfo();
  }

  

  continue() {
    this.stepper.next();
  }

  allChecked(event?: any) {
    this.isChecked = event;
  }

  getValueSlider(event?) {
    console.log(event);
    this.value = event;
    this.secureAndQuotesControls.quotesToPay.patchValue(this.value);

    this.getCommission(this.value);
  }

  getValueCheckBoxes(event: any) {
    const checkArray: FormArray = this.secureAndQuotesForm.get('aditionalProducts') as FormArray;
     (event.checked) ? this.quotesToPayOfAmount = true: false;
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
    (event.checked) ? this.quotesToPayOfAmount = true: false;

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
  }

  newDirectionChecked(event){
    if (event.value ==='newDirection' && event.checked) {
      this.newDirection();
    }
    this.newDeliveryOption = event.value;
  }

  consult() {
    this.httpService.post('marchamos', 'pay/vehicleconsult', {
      channelId: 107,
      plateClassId: this.consultControls.vehicleType.value.toString(),
      plateNumber: this.consultControls.plateNumber.value.toUpperCase(),
      aditionalProducts: []
    })
      .subscribe(response => {
        console.log(response);
          this.consultVehicle = response.REQUESTRESULT.soaResultVehicleConsult.header;
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
      this.pickUpControls.email.setValue(response.REQUESTRESULT.soaResultPayerInfo.header.email);
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
      this.deliveryPlaces = response.deliveryPlacesList;
    });
  }

  getCommission(commission:number){
    this.httpService.post('marchamos', 'pay/calculatecommission',{
      channelId: 107,
      amount:this.amountValue,
      commissionQuotasId: 6
    }).subscribe(response => { console.log(response);});
  }
  

  secureToPay() {
    this.httpService.post('marchamos', 'pay/soapay',
      {
        channelId: 101,
        aditionalProducts: [],
        amount: 1690727,
        authenticationNumberCommission: '0000',
        authenticationNumberMarchamo1: '000000',
        cardNumber: 289534,
        deliveryPlaceId: 1,
        domicilePerson: '',
        domicilePhone: '',
        domicilePlace: '',
        email: 'luisporteperez@GMAIL.COM',
        extraCardStatus: '0',
        firstPayment: 'Siguiente pago',
        ownerEmail: 'luisporteperez@GMAIL.COM',
        payId: 'cgVJcuPB3k',
        payerId: 114140321,
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

  showDetail(data?: any) {
    this.popupShowDetail = this.modalService.open({
      component: PopupMarchamosDetailComponent,
      hideCloseButton: false,
      data:data
    }, {width: 376, height: 368, disableClose: false});
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

  editNewDirection(edit:boolean){
    if (edit) {
      this.newDirection(this.newDeliveryDirection);  
    }
    
  }


  payWithQuotesAndSecure() {

  }


  submit() {

  }
}
