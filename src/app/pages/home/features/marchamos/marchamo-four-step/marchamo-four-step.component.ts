import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MarchamosService} from '../marchamos.service';

@Component({
  selector: 'app-marchamo-four-step',
  templateUrl: './marchamo-four-step.component.html',
  styleUrls: ['./marchamo-four-step.component.scss']
})
export class MarchamoFourStepComponent implements OnInit, OnChanges {
  contactConfirm: { name: string, phone: number, email: string } = {
    name: '',
    phone: 0,
    email: ''
  };
  total = 0;
  amountTotalProducts = 0;
  place: { placeDescription: string } = {
    placeDescription: ''
  };
  totalAmount = 0;
  ivaAndCommission: { iva: number, commission: number } = {
    iva: 0,
    commission: 0
  };
  @Input() confirmForm: FormGroup = new FormGroup({
    credixCode: new FormControl(null, [Validators.required])
  });
  @Input() isActive = false;

  constructor(private marchamosService: MarchamosService) {
  }

  ngOnInit(): void {
    this.marchamosService.ivaAndCommission.subscribe(value => {
      this.ivaAndCommission = {iva: value.iva, commission: value.commission};
    });
    this.marchamosService.domicileDescription.subscribe(value => {
      this.contactConfirm = {name: value.name, phone: value.number, email: value.email};
      this.place = {placeDescription: value.detail};
    });
    this.marchamosService.newDeliveryDirection.subscribe(value => {
      this.contactConfirm = {name: value.personReceive, phone: value.phoneNumber, email: value.email};
      this.place = {placeDescription: value.exactlyDirection};
    });
    this.marchamosService.pickUpStoreId.subscribe(value => {
      this.pickUpStoreById(value.pickUpId);
    });
    this.marchamosService.consultVehicleAndBillingHistory.subscribe(value => {
      this.totalAmount = value.consultVehicle.amount;
    });
    this.marchamosService.amountItemsProducts.subscribe(value => {
      this.amountTotalProducts =
        this.amountTotalProducts + value.moreProtectionAmount + value.responsabilityCivilAmount + value.roadAsistanceAmount;
    });

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isActive && this.isActive) {
      this.getTotalSum();
    }
  }

  getTotalSum() {
    this.total = this.total + this.totalAmount + this.amountTotalProducts + this.ivaAndCommission.iva + this.ivaAndCommission.commission;
  }

  private pickUpStoreById(pickUpId: number) {
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
