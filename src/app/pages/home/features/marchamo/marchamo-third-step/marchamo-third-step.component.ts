import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalService} from 'src/app/core/services/modal.service';
import {MarchamoService} from '../marchamo.service';
import {DeliveryPlace} from 'src/app/shared/models/delivery-place';
import {HttpService} from 'src/app/core/services/http.service';
import {StorageService} from 'src/app/core/services/storage.service';
import {TagsService} from '../../../../../core/services/tags.service';
import {Tag} from '../../../../../shared/models/tag';
import {Address} from '../../../../../shared/models/address';
import {NewAddressPopupComponent} from './new-address-popup/new-address-popup.component';
import {ChannelsApiService} from '../../../../../core/services/channels-api.service';
import {finalize} from 'rxjs/operators';
import { MarchamoComponent } from '../marchamo.component';

@Component({
  selector: 'app-marchamo-third-step',
  templateUrl: './marchamo-third-step.component.html',
  styleUrls: ['./marchamo-third-step.component.scss']
})
export class MarchamoThirdStepComponent implements OnInit, OnChanges {
  @Input() pickUpForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    address: new FormControl(null, [Validators.required]),
    deliveryPlace: new FormControl(null),
    phoneNumber: new FormControl(null),
    person: new FormControl(null)
  });
  @Input() isActive = false;
  placeRadioButton = 0;
  addressRadioButton = 0;
  deliveryPlaces: DeliveryPlace[];
  newAddress: Address;
  addressApplicant: any;
  informationApplicant: any;
  name: string;
  userAddress: string;
  phoneNumber: number;
  userEmail: string;
  secondSubtitle: string;
  subOptionTwoTag: string;
  subOptionOneTag: string;
  optionOneTag: string;
  optionTwoTag: string;
  firstSubtitle: string;
  //new tags marchamos
  deliveryAmount: string;
  leyendTag: string;
  totalAmount = 0;
  activateDeliveryOption = null;
  officeMessage= null;
  residenceMessage = null;

  constructor(private httpService: HttpService,
              private modalService: ModalService,
              private channelsApiService: ChannelsApiService,
              private marchamoService: MarchamoService,
              private storageService: StorageService,
              private tagsService: TagsService,
              private marchamoComponent: MarchamoComponent,) {
  }

  ngOnInit(): void {
    this.getValueActivateOrDisableDeliveryOption();
    this.getDeliveryTimeMessagesMarchamo();
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Marchamo').tags)
    );

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isActive && this.isActive) {
      this.getUserAddress();
      this.pickUpForm.controls.person.setValue(this.storageService.getCurrentUser().aplicantName);
      this.totalAmount = this.marchamoService.consultVehicle.amount;
    }
  }



  placesRadioButtonChanged(value: number) {
    this.placeRadioButton = value;

    if (value === 1) {
      this.getDeliveryPlaces();
      this.pickUpForm.controls.deliveryPlace.setValidators([Validators.required]);
      this.pickUpForm.controls.phoneNumber.clearValidators();
      this.pickUpForm.controls.person.clearValidators();
      this.deliveryAmount = "0";
    } else {
      this.pickUpForm.controls.deliveryPlace.clearValidators();
      this.pickUpForm.controls.phoneNumber.setValidators([Validators.required]);
      this.pickUpForm.controls.person.setValidators([Validators.required]);
    }
    this.pickUpForm.updateValueAndValidity();
  }

  eventClick(checked) {

    if (checked) {
      this.deliveryPlaceAmount();
      return;
    }
  }

  eventClick2(checked) {
    if (checked) {
      this.deliveryPlaceAmount();
      return;
    }
  }

  deliveryPlaceAmount(){
    this.deliveryAmount = localStorage.getItem("delivery");
    localStorage.setItem("delivery2", this.deliveryAmount);
    console.log(this.marchamoComponent.validaIVA);
    if(!this.marchamoComponent.validaIVA){
      console.log(this.marchamoService.iva);
      this.marchamoService.iva += (Number(this.deliveryAmount) * 0.13);
      this.marchamoComponent.validaIVA = true;
    }
    
    //console.log(this.deliveryAmount);
  }

  domicileRadioButtonChanged(value: number) {
    this.addressRadioButton = value;
    if (this.addressRadioButton === 1) {
      this.pickUpForm.controls.deliveryPlace.reset(null, {emitEvent: false});
      this.pickUpForm.controls.address.setValue(this.userAddress);
      this.pickUpForm.controls.email.setValue(this.userEmail);
      this.pickUpForm.controls.phoneNumber.setValue(this.phoneNumber);
      this.pickUpForm.enable();
    } else {
      this.openNewAddressModal();
    }
    this.pickUpForm.updateValueAndValidity();
  }

  getDeliveryPlaces() {
    this.marchamoService.getDeliveryPlaces()
      .pipe(finalize(() => this.onDeliveryPlaceChanged()))
      .subscribe((response) => {
        this.deliveryPlaces = response;
      });
  }

  getValueActivateOrDisableDeliveryOption() {
    this.marchamoService.getValueActivateOrDisableDeliveryOption()
      .pipe(finalize(() => {}))
      .subscribe((response) => {
        this.activateDeliveryOption = response;
        this.placesRadioButtonChanged(0);
        this.eventClick2(true);
      });
  }

  getDeliveryTimeMessagesMarchamo() {
    this.marchamoService.getDeliveryTimeMessagesMarchamo()
      .pipe(finalize(() => {}))
      .subscribe((response) => {
        this.officeMessage = response.office;
        this.residenceMessage = response.residence;
      });
  }

  getUserAddress() {
    this.channelsApiService.getThAddresses()
      .subscribe(thAddresses => {
        const address = thAddresses.addresses.find(tad => tad.tadId === 2);
        this.phoneNumber = thAddresses.phone;
        this.userEmail = thAddresses.email;
        this.userAddress = `${address.detail}, ${address.district}, ${address.canton},${address.province}`;
        this.pickUpForm.controls.address.setValue(this.userAddress);
        this.pickUpForm.controls.email.setValue(this.userEmail);
        this.pickUpForm.controls.phoneNumber.setValue(this.phoneNumber);
      });
  }

  onDeliveryPlaceChanged() {
    this.pickUpForm.controls.deliveryPlace.valueChanges.subscribe(value => {
      if (value) {
        this.pickUpForm.controls.address
          .setValue(this.deliveryPlaces.find(dlp => dlp.id === value).description);
      }
    });
  }

  openNewAddressModal(address?: Address) {
    this.modalService.open({
      component: NewAddressPopupComponent,
      hideCloseButton: false,
      title: 'Nueva dirección de entrega',
      data: {address}
    }, {width: 380, height: 614, disableClose: true, panelClass: 'marchamo-address-panel'})
      .afterClosed().subscribe((value: Address) => {
      if (value) {
        this.newAddress = value;
        this.phoneNumber = value.phoneNumber;
        this.userAddress = `${this.newAddress.detail}, ${this.newAddress.district.description}, ${this.newAddress.canton.description},${this.newAddress.province.description}`;
        this.pickUpForm.controls.person.setValue(value.name);
        this.pickUpForm.controls.address.setValue(this.userAddress);
        this.pickUpForm.controls.phoneNumber.setValue(this.phoneNumber);
        this.pickUpForm.enable();
      }
    });
  }

  editNewAddress() {
    this.openNewAddressModal(this.newAddress);
  }

  getTags(tags: Tag[]) {
    this.secondSubtitle = tags.find(tag => tag.description === 'marchamos.stepper3.subtitle2')?.value;
    this.subOptionTwoTag = tags.find(tag => tag.description === 'marchamos.stepper3.option1.option2')?.value;
    this.subOptionOneTag = tags.find(tag => tag.description === 'marchamos.stepper3.option1.option1')?.value;
    this.optionOneTag = tags.find(tag => tag.description === 'marchamos.stepper3.option1')?.value;
    this.optionTwoTag = tags.find(tag => tag.description === 'marchamos.stepper3.option2')?.value;
    this.firstSubtitle = tags.find(tag => tag.description === 'marchamos.stepper3.subtitle1')?.value;
    this.leyendTag = tags.find(tag => tag.description === 'marchamos.deliveryAmount.leyend')?.value;
  }

  ngOnDestroy(): void {
    this.marchamoComponent.validaIVA = false;
    this.placeRadioButton = 0;
  }


}
