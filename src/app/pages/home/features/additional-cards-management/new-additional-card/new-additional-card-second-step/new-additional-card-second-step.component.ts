import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DeliveryPlace} from '../../../../../../shared/models/delivery-place';
import {FormControl, Validators} from '@angular/forms';
import {Address} from '../../../../../../shared/models/address';
import {ModalService} from '../../../../../../core/services/modal.service';
import {NewAddressPopupComponent} from './new-address-popup/new-address-popup.component';
import {StorageService} from '../../../../../../core/services/storage.service';
import {AdditionalCardsManagementService} from '../../additional-cards-management.service';
import {TagsService} from '../../../../../../core/services/tags.service';
import {Tag} from '../../../../../../shared/models/tag';
import {GlobalApiService} from '../../../../../../core/services/global-api.service';
import {ChannelsApiService} from '../../../../../../core/services/channels-api.service';

@Component({
  selector: 'app-new-additional-card-second-step',
  templateUrl: './new-additional-card-second-step.component.html',
  styleUrls: ['./new-additional-card-second-step.component.scss']
})
export class NewAdditionalCardSecondStepComponent implements OnInit, OnDestroy {
  @Input() addressControl = new FormControl(null, [Validators.required]);
  placeRadioButton = 0;
  addressRadioButton = 0;
  deliveryPlaces: DeliveryPlace[];
  newAddress: Address;
  name: string;
  userAddress: string;
  userPhoneNumber: number;
  userEmail: string;
  optionOneTag: string;
  subOptionOneTag: string;
  subOptionTwoTag: string;
  optionTwoTag: string;
  linkTag: string;
  subtitleTag: string;

  constructor(private globalApiService: GlobalApiService,
              private channelsApiService: ChannelsApiService,
              private additionalCardsManagementService: AdditionalCardsManagementService,
              private storageService: StorageService,
              private tagsService: TagsService,
              private modalService: ModalService) {
    this.name = this.storageService.getCurrentUser().aplicantName;
  }

  ngOnInit(): void {
    this.onFormChanged();
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Tarjetas adicionales').tags));
  }

  getDeliveryPlaces() {
    this.globalApiService.getDeliveryPlaces().subscribe(deliveryPlaces => this.deliveryPlaces = deliveryPlaces);
  }

  getUserAddress() {
    this.channelsApiService.getThAddresses()
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

  placeRadioButtonChanged(value: number) {
    this.placeRadioButton = value;
    this.addressControl.reset();
    if (value === 1) {
      this.getDeliveryPlaces();
    }
  }

  addressRadioButtonChanged(value: number) {
    this.addressRadioButton = value;
    this.addressControl.reset();
    switch (value) {
      case 1 :
        this.getUserAddress();
        break;
      case 2:
        this.openNewAddressModal();
        break;
      default:
        this.getUserAddress();
    }
  }

  getTags(tags: Tag[]) {
    this.optionOneTag = tags.find(tag => tag.description === 'adicionales.stepper2.option1').value;
    this.subOptionOneTag = tags.find(tag => tag.description === 'adicionales.stepper2.option1.option1').value;
    this.subOptionTwoTag = tags.find(tag => tag.description === 'adicionales.stepper2.option1.option2').value;
    this.optionTwoTag = tags.find(tag => tag.description === 'adicionales.stepper2.option2').value;
    this.linkTag = tags.find(tag => tag.description === 'adicionales.stepper2.option2.option2.link').value;
    this.subtitleTag = tags.find(tag => tag.description === 'adicionales.stepper2.subtitle').value;
  }

  ngOnDestroy(): void {
    this.additionalCardsManagementService.unsubscribe();
  }
}
