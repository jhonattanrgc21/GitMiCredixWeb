import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MarchamosService } from '../marchamos.service';

@Component({
  selector: 'app-four-step-marchamo',
  templateUrl: './four-step-marchamo.component.html',
  styleUrls: ['./four-step-marchamo.component.scss']
})
export class FourStepMarchamoComponent implements OnInit, OnChanges {

  contactConfirm: {name: string, phone: number, email:string} = {
    name: '',
    phone: 0,
    email: ''
  };

  place:{placeDescription: string}={
    placeDescription:''
  }
  totalAmount:number = 0;

  ivaAndCommission: { iva: number, commission:number};

  @Input()  confirmForm: FormGroup = new FormGroup({
    credixCode: new FormControl(null, [Validators.required])
  });

  @Input() isActive: boolean = false;

  constructor(private marchamosService: MarchamosService) { }

  ngOnInit(): void {
    this.marchamosService.ivaAndCommission.subscribe(value => {
      this.ivaAndCommission =  {iva: value.iva, commission:value.commission};
    });
    this.marchamosService.domicileDescription.subscribe(value => {
      console.log(value);
      this.contactConfirm = {name: value.name, phone:value.number, email: value.email};
      this.place = {placeDescription: value.detail};
    });
    this.marchamosService.newDeliveryDirection.subscribe(value => {
      this.contactConfirm  = {name:value.personReceive, phone:value.phoneNumber, email:value.email};
      this.place = {placeDescription:value.exactlyDirection};
    });
    this.marchamosService.pickUpStoreId.subscribe( value=> {
      this.pickUpStoreById(value.pickUpId);
    });
    this.marchamosService.consultVehicleAndBillingHistory.subscribe(value => {
      this.totalAmount = value.consultVehicle.amount;
    });
  }
  ngOnChanges(changes: SimpleChanges){
    if (changes.isActive && this.isActive) {
     
    }
  }


  private pickUpStoreById(pickUpId:number) {
    switch (pickUpId) {
      case 1:
        this.place = {
          placeDescription: 'SUCURSAL TIBÁS'
        };
        break;
      case 2:
        this.place = {
          placeDescription: 'SUCURSAL BELÉN'
        };
        break;
      case 3:
        this.place = {
          placeDescription: 'SUCURSAL ESCAZÚ'
        };
        break;
      case 4:
        this.place = {
          placeDescription: 'SUCURSAL TIBÁS'
        };
        break;
      case 5:
        this.place = {
          placeDescription: 'SUCURSAL DESAMPARADOS'
        };
        break;
      case 7:
        this.place = {
          placeDescription: 'ADMINISTRATIVO'
        };
        break;
    }
  }

}
