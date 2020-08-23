import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PopupMarchamosNewDirectionComponent } from '../popup-marchamos-new-direction/popup-marchamos-new-direction.component';
import { HttpService } from 'src/app/core/services/http.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { DeliveryPlace } from 'src/app/shared/models/deliveryPlace.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'thirsty-step-place-of-retreat',
  templateUrl: './thirsty-step-place-of-retreat.component.html',
  styleUrls: ['./thirsty-step-place-of-retreat.component.scss']
})
export class ThirstyStepPlaceOfRetreatComponent implements OnInit {

  deliveryPlaces: DeliveryPlace[];
  radioButtonsChangedValue: any;
  domicileDescription: any;
  domicile: boolean = false;
  newDeliveryDirection: any;
  newDeliveryOption: string;
  newDomicile: boolean = false;
  placeOfRetreat: {placeDescription: string} = {
    placeDescription: ''
  };
  private popupNewDirection: MatDialogRef<PopupMarchamosNewDirectionComponent | any>;
  
  @Input() informationApplicant: any;
  @Input() addressAplicant: any[] = [];

  @Input() pickUp: FormControl;

  @Output() dataDelivery: EventEmitter<any> = new EventEmitter<any>();
  @Output() placeOfRetreatChanged: EventEmitter<any> = new EventEmitter<any>(); 

  constructor(private httpService: HttpService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.getPickUpStore();
  }

  getPickUpStore() {
    this.httpService.post('marchamos', 'pay/deliveryplaces', {channelId: 102})
      .subscribe(response => {
        this.deliveryPlaces = response.deliveryPlacesList.filter(x => x.id !== 6);
      });
  }

  getRadioButtonsChecked(event) {
    this.radioButtonsChangedValue = event.value;

    if (event.value === 2 && event.checked) {
      this.domicileDescription = {
        name: this.informationApplicant.printName,
        number: (this.informationApplicant.phoneApplicant[0].phoneType.id === 1) ? this.informationApplicant.phoneApplicant[0].phone : ''
      };
    }


    if (event.value === 1 && event.checked) {
      if (this.addressAplicant[0].addressType.id === 2) {
        this.domicile = true;
        this.domicileDescription = {
          name: this.informationApplicant.printName,
          detail: this.addressAplicant[0].detail,
          province: this.informationApplicant.addressApplicant[0].province.description,
          canton: this.informationApplicant.addressApplicant[0].canton.description,
          distric: this.informationApplicant.addressApplicant[0].district.description,
          number: (this.informationApplicant.phoneApplicant[0].phoneType.id === 1) ? this.informationApplicant.phoneApplicant[0].phone : ''
        };
      } else {
        this.newDirection();
      }
    }

    this.dataDelivery.emit(this.domicileDescription);
  }

  newDirectionChecked(event) {
    if (event.value === 'newDirection' && event.checked) {
      this.newDirection();
    }


    this.newDeliveryOption = event.value;
  }

  newDirection(data?: any) {
    this.popupNewDirection = this.modalService.open({
      component: PopupMarchamosNewDirectionComponent,
      hideCloseButton: false,
      title: 'Nueva dirección de entrega',
      data: data
    }, {width: 380, height: 614, disableClose: false});
    this.popupNewDirection.afterClosed().subscribe(values => {
      this.newDeliveryDirection = {
        canton: values.canton,
        distric: values.distric,
        exactlyDirection: values.exactlyDirection,
        personReceive: values.personReceive,
        phoneNumber: values.phoneNumber,
        province: values.province
      };
      this.dataDelivery.emit(this.newDeliveryDirection);
    });
  }

  editNewDirection(edit: boolean) {
    if (edit) {
      this.newDirection(this.newDeliveryDirection);
    }
  }

  getPlaceOfRetreat() {
    (this.radioButtonsChangedValue === 2) ? this.isPickUp() : this.isDelivery();
  }


  private isPickUp() {
    switch (this.pickUp.value) {
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
    this.placeOfRetreatChanged.emit({placeDescription:this.placeOfRetreat.placeDescription});
  }

  private isDelivery() {
    if (this.newDeliveryOption === 'directionRegister' || !this.newDeliveryDirection) {
      this.placeOfRetreat = {
        placeDescription: this.domicileDescription.detail
      };
    } else if (this.newDeliveryOption === 'newDirection' && this.newDeliveryDirection) {
      this.placeOfRetreat = {
        placeDescription: this.newDeliveryDirection.exactlyDirection
      };
    } else {
      return;
    }
    this.placeOfRetreatChanged.emit({placeDescription:this.placeOfRetreat.placeDescription});
  }
}
