import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpService} from 'src/app/core/services/http.service';
import {ModalService} from 'src/app/core/services/modal.service';
import {VehicleType} from 'src/app/shared/models/vehicleType.models';
import {CdkStepper} from '@angular/cdk/stepper';
import {MatDialogRef} from '@angular/material/dialog';
import {PopupMarchamosDetailComponent} from './popup-marchamos-detail/popup-marchamos-detail.component';

@Component({
  selector: 'app-marchamos',
  templateUrl: './marchamos.component.html',
  styleUrls: ['./marchamos.component.scss']
})
export class MarchamosComponent implements OnInit {

  vehicleType: VehicleType[] = [
    {
      description: 'ALAJUELA BUS',
      type: 1
    },
    {
      description: 'ALAJUELA PUBLICO',
      type: 2
    },
    {
      description: 'BICIMOTOS',
      type: 3
    },
    {
      description: 'CARGA PESADA',
      type: 4
    },
    {
      description: 'CARTAGO BUS',
      type: 5
    },
    {
      description: 'CARGA LIVIANA',
      type: 6
    },
    {
      description: 'CARTAGO PUBLICO',
      type: 7
    },
    {
      description: 'CRUZ ROJA COSTARRICENSE',
      type: 8
    },
    {
      description: 'DISCAPACITADO',
      type: 9
    },
    {
      description: 'EQUIPO ESPECIAL',
      type: 10
    },
    {
      description: 'EXPORTACION',
      type: 11
    },
    {
      description: 'GUANACASTE BUS',
      type: 12
    },
    {
      description: 'GUANACASTE PUBLICO',
      type: 13
    },
    {
      description: 'HEREDIA BUS',
      type: 14
    },
    {
      description: 'HEREDIA PUBLICO',
      type: 15
    },
    {
      description: 'LIMON BUS',
      type: 16
    },
    {
      description: 'LIMITACIONES FISICAS PERMANENTES',
      type: 17
    },
    {
      description: 'LIMON PUBLICO',
      type: 18
    },
    {
      description: 'MUDIAL DE FUTBOL FEMENINO 2014',
      type: 19
    },
    {
      description: 'MOTOS',
      type: 20
    },
    {
      description: 'PARTICULAR',
      type: 21
    },
    {
      description: 'PUNTARENAS BUS',
      type: 22
    },
    {
      description: 'PENSIONADO',
      type: 23
    },
    {
      description: 'PUNTARENAS PUBLICO',
      type: 24
    },
    {
      description: 'SAN JOSE BUS',
      type: 25
    },
    {
      description: 'SAN JOSE PUBLICO',
      type: 26
    },
    {
      description: 'TAXI ALAJUELA',
      type: 27
    },
    {
      description: 'AEROPUERTO INTERNACIONAL JUAN SANTAMARIA',
      type: 28
    },
    {
      description: 'PERMISO DE TAXI',
      type: 29
    },
    {
      description: 'TAXI CARTAGO',
      type: 30
    },
    {
      description: 'TAXI GUANACASTE',
      type: 31
    },
    {
      description: 'TAXI HEREDIA',
      type: 32
    },
    {
      description: 'TAXI LIMON',
      type: 33
    },
    {
      description: 'TAXI PUNTARENAS',
      type: 34
    },
    {
      description: 'TAXI SAN JOSE',
      type: 35
    },
    {
      description: 'TURISMO',
      type: 36
    },
    {
      description: 'CLASE TEMPORAL PARA EL PERIODO 2016',
      type: 37
    },
    {
      description: 'CLASE TEMPORAL PARA EL PERIODO 2017',
      type: 38
    },
    {
      description: 'CLASE TEMPORAL PARA EL PERIODO 2018',
      type: 39
    },
    {
      description: 'EMBAJADA DE ESTADOS UNIDOS',
      type: 40
    },
    {
      description: 'VEHICULO ESPECIAL',
      type: 41
    },
    {
      description: 'VEHICULO HISTORICO',
      type: 42
    },
    {
      description: 'ZONAS FRANCAS DE EXPORTACION',
      type: 43
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
  vehicleInformation: boolean;
  totalMount = '₡ 114.996,00';
  value = 1;
  popupShowDetail: MatDialogRef<PopupMarchamosDetailComponent>;
  isChecked = false;
  sliderChangedValue = false;


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
    email: new FormControl('', []),
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

  ngOnInit(): void {
    this.getVehicleType();
  }

  consult() {
    this.httpService.post('marchamos', 'pay/vehicleconsult', {
      channelId: 107,
      plateClassId: this.consultControls.vehicleType.value.toString(),
      plateNumber: this.consultControls.plateNumber.value.toUpperCase(),
      aditionalProducts: []
    })
      .subscribe(response => console.log(response));
    this.vehicleInformation = true;
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
  }

  getValueCheckBoxes(event: any) {
    console.log(event);
    const checkArray: FormArray = this.secureAndQuotesForm.get('aditionalProducts') as FormArray;

    if (event.checked) {
      checkArray.push(new FormControl(event.source.value));
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

  getVehicleType() {
    this.httpService.post('marchamos', 'pay/platetypes', {channelId: 102}).subscribe(response => console.log(response));
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
      data
    }, {width: 376, height: 368, disableClose: false});
    this.popupShowDetail.afterClosed();
    // .subscribe(modal => this.responseResult.message = modal.message);
  }

  payWithQuotesAndSecure() {

  }


  submit() {

  }
}
