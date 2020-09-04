import {Component, Input, OnInit} from '@angular/core';
import {DeliveryPlace} from '../../../../../../shared/models/deliveryPlace.model';
import {GlobalRequestsService} from '../../../../../../core/services/global-requests.service';
import {FormControl, Validators} from '@angular/forms';
import {Address} from '../../../../../../shared/models/address';
import {ModalService} from '../../../../../../core/services/modal.service';
import {NewAddressPopupComponent} from './new-address-popup/new-address-popup.component';
import {StorageService} from '../../../../../../core/services/storage.service';
import {AdditionalCardsManagementService} from '../../additional-cards-management.service';

@Component({
  selector: 'app-new-additional-card-second-step',
  templateUrl: './new-additional-card-second-step.component.html',
  styleUrls: ['./new-additional-card-second-step.component.scss']
})
export class NewAdditionalCardSecondStepComponent implements OnInit {
  @Input() addressControl = new FormControl(null, [Validators.required]);
  placeRadioButton = 0;
  addressRadioButton = 0;
  deliveryPlaces: DeliveryPlace[];
  newAddress: Address;
  name: string;
  userAddress: string;
  userPhoneNumber: number;
  userEmail: string;

  constructor(private globalRequestsService: GlobalRequestsService,
              private additionalCardsManagementService: AdditionalCardsManagementService,
              private storageService: StorageService,
              private modalService: ModalService) {
    this.name = this.storageService.getCurrentUser().aplicantName;
  }

  ngOnInit(): void {
    this.onFormChanged();
  }

  getDeliveryPlaces() {
    this.globalRequestsService.getDeliveryPlaces().subscribe(deliveryPlaces => this.deliveryPlaces = deliveryPlaces);
  }

  getUserAddress() {
    this.globalRequestsService.getThAddresses()
      .subscribe(thAddresses => {
        const address = thAddresses.addresses.find(tad => tad.tadId === 2);
        this.userPhoneNumber = thAddresses.phone;
        this.userEmail = thAddresses.email;
        this.userAddress = `${address.detail}, ${address.district}, ${address.canton},${address.province}`;
        this.addressControl.setValue(this.userAddress);
      });
  }

  openNewAddressModal(address?: Address) {
    this.modalService.open({
      component: NewAddressPopupComponent,
      hideCloseButton: false,
      title: 'Nueva dirección de entrega',
      data: {address}
    }, {width: 380, height: 614, disableClose: true, panelClass: 'additional-card-address-panel'})
      .afterClosed()
      .subscribe((value: Address) => {
        if (value) {
          this.newAddress = value;
          this.addressControl.setValue(`${value.detail}, ${value.district.description}, ${value.canton.description}, ${value.province.description}`);
        }
      });
  }

  editNewAddress() {
    this.openNewAddressModal(this.newAddress);
  }

  onFormChanged() {
    this.addressControl.valueChanges.subscribe(value => {
      if (this.addressControl.valid) {
        this.additionalCardsManagementService.pickUpPlace = value;
      }
    });
  }
}
