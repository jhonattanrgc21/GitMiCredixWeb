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

@Component({
  selector: 'app-marchamos',
  templateUrl: './marchamos.component.html',
  styleUrls: ['./marchamos.component.scss']
})
export class MarchamosComponent implements OnInit {

  vehicleType: VehicleType[];
  consultVehicle: ConsultVehicle;
  deliveryPlaces: DeliveryPlace[];
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
    },
    {
      responseDescription: "Todos.",
      responseCode: 15,
      productCode: 10
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

  delivery: any = {
    deliveryName: 'Sergio Marquina',
    deliveryNumber:'8888-8888',
    deliveryLocation:'Del cruce de Llorente de Tibas, 300 metros Este, Colima, Tibas, San José.'
  }

  vehicleInformation: boolean;
  totalMount:string = '₡ 114.996,00';
  value = 1;
  popupShowDetail: MatDialogRef<PopupMarchamosDetailComponent>;
  popupNewDirection: MatDialogRef<PopupMarchamosNewDirectionComponent | any>;
  isChecked = false;
  sliderChangedValue = false;
  radioButtonsChangedValue: any;
  amount:number = 408455;


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
    private element: ElementRef
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

  getValueCheckBoxes(event: any, all?:string) {
    const checkArray: FormArray = this.secureAndQuotesForm.get('aditionalProducts') as FormArray;
    if (event.source.id === 'mat-checkbox-4') {
      this.allChecked(event.checked);  

      for (let index = 0; index < this.itemProduct.length; index++) {
        console.log(this.itemProduct[index]);
      }
    }
     (event.checked) ? this.sliderChangedValue = true: false;

     console.log(event.source._elementRef.nativeElement.id);
    if (event.checked) {
      checkArray.push(new FormGroup({
        productCode:new FormControl(event.source.value)
      }));
    } else {
      let index = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value === event.source.value) {
          checkArray.removeAt(index);
          return;
        }
        index++;
      });
    }
  }

  getRadioButtonsChecked(event){
    this.radioButtonsChangedValue = event.value;
  }

  newDirectionChecked(event){
    if (event.value ==='newDirection' && event.source.checked) {
      this.newDirection();
    }

  }

  consult() {
    this.httpService.post('marchamos', 'pay/vehicleconsult', {
      channelId: 107,
      plateClassId: this.consultControls.vehicleType.value.toString(),
      plateNumber: this.consultControls.plateNumber.value.toUpperCase(),
      govermentCode:'PAR',
      aditionalProducts: [
        {
          "productCode": 5
        },
        {
          "productCode": 6
        },
        {
          "productCode": 8
        }
      ]
    })
      .subscribe(response => { 
        console.log(response);
          this.consultVehicle = response.REQUESTRESULT.soaResultVehicleConsult.header;
        (response.type === 'success') ? this.vehicleInformation = !this.vehicleInformation : this.vehicleInformation;
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

  newDirection() {
    this.popupNewDirection = this.modalService.open({
      component: PopupMarchamosNewDirectionComponent,
      hideCloseButton: false,
      title:'Nueva dirección de entrega'
    },{width: 380, height: 614, disableClose: false});
    this.popupNewDirection.afterClosed().subscribe( values => console.log(values));
  }

  payWithQuotesAndSecure() {

  }


  submit() {

  }
}
