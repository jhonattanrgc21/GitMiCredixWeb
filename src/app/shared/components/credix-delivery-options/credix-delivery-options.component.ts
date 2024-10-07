import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ChannelsApiService } from 'src/app/core/services/channels-api.service';
import { ApplicantAddressInfo } from 'src/app/shared/models/th-address';
import { ModalService } from 'src/app/core/services/modal.service';
import {NewAddressPopupComponent} from "./new-address-popup/new-address-popup.component"
import { filter, map, startWith } from 'rxjs/operators';
import { Address } from 'src/app/shared/models/address';
import { DeliveryPlace } from '../../models/delivery-place';
import { StorageService } from 'src/app/core/services/storage.service';
import { GlobalApiService } from 'src/app/core/services/global-api.service';
import { combineLatest, Observable } from 'rxjs';
import { AddressInfo, DeliveryInfo, DeliveryOptionsData } from './interfaces/delivery-options.interface';

 @Component({
  selector: 'credix-delivery-options-component',
  templateUrl: './credix-delivery-options.component.html',
  styleUrls: ['./credix-delivery-options.component.scss'],
})
export class CredixDeliveryOptionsComponent implements OnInit, AfterViewInit {
  applicantName = this.storageService.getCurrentUser().aplicantName;

  deliveryOptionControl = new FormControl('', Validators.required)
  deliveryPlaceSelectionControl = new FormControl('', Validators.required)
  homeDeliveryOptionControl = new FormControl('', Validators.required)
  addressInfoControl = new FormControl('', Validators.required)

  newAdressData: Address;

  deliveryPlaces: DeliveryPlace[];

  applicantAdressInfo: ApplicantAddressInfo

  addressFetchingError = false

  DeliveryDetailsData$: Observable<DeliveryOptionsData>;

  constructor(
    private channelsApiService: ChannelsApiService,
    private storageService: StorageService,
    private modalService: ModalService,
    private globalApiService: GlobalApiService) {}

  ngOnInit(): void {

    this.deliveryOptionControl.valueChanges.subscribe((value) => {
      if(value === 1){
        this.getDeliveryPlaces()
      }
    })

    this.homeDeliveryOptionControl.valueChanges
      .subscribe((value) => {
        switch(value){
          case 1:
            this.getThAddresses()
            break;
          case 2:
            this.openNewAdressPopUp()
            break;
        }
      })
  }

  ngAfterViewInit(): void {
    this.DeliveryDetailsData$ = combineLatest([
      this.deliveryOptionControl.valueChanges.pipe(startWith('')),
      this.deliveryPlaceSelectionControl.valueChanges.pipe(startWith('')),
      this.homeDeliveryOptionControl.valueChanges.pipe(startWith('')),
      this.addressInfoControl.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(() => {
        const invalidForm = this.checkIfFormInvalid()

        if(invalidForm){
          return {
            isValid: false,
            deliveryInfo: null
          }
        } else {
          return {
            isValid: true,
            deliveryInfo: this.submitDeliveryOption()
          }
        }
      })
    )
  }

  getDeliveryPlaces(){
    this.globalApiService.getDeliveryPlaces().subscribe((deliveryPlaces) => {
      this.deliveryPlaces = deliveryPlaces
    })
  }

  getThAddresses(){
    this.channelsApiService.getThAddresses().subscribe((applicantAdressInfo) => {
      if(!!applicantAdressInfo){
        this.applicantAdressInfo = applicantAdressInfo
        this.addressInfoControl.setValue(applicantAdressInfo)
      } else {
        this.addressInfoControl.setValue(null)
        this.addressFetchingError = true
      }
    })
  }

  editNewAdress(){
    this.openNewAdressPopUp(this.newAdressData)
  }

  openNewAdressPopUp(preloadAddressData: Address = null){
    this.modalService.open({
      component: NewAddressPopupComponent,
      hideCloseButton: false,
      title: 'Nueva dirección de entrega',
      data: {
        applicantAddressInfo: preloadAddressData
      }
    }, {width: 514, disableClose: true, panelClass: 'renew-card-adress-popup'})
      .afterClosed()
      .pipe(
        filter(value => !!value)
      ).subscribe((newAdressData) => {
        this.newAdressData = newAdressData
        this.addressInfoControl.setValue(newAdressData)
      })
  }

  checkIfFormInvalid(){
    switch(this.deliveryOptionControl.value){
      case 1:// Sucursales

        return this.deliveryPlaceSelectionControl.invalid
      case 2:// Domicilio

        //Existing address
        if(this.homeDeliveryOptionControl.value === 1) return this.addressFetchingError || !this.applicantAdressInfo

        //New address
        if(this.homeDeliveryOptionControl.value === 2) return !this.newAdressData

        return true
      default:
        return true
    }
  }

  submitDeliveryOption(): DeliveryInfo{
    if(this.checkIfFormInvalid()) return
    const deliveryOption = this.deliveryOptionControl.value

    switch(deliveryOption){
      case 1:

        return {
          type: 1,
          deliveryPlace: this.deliveryPlaceSelectionControl.value,
        }
      case 2:
        const homeDeliveryOption = this.homeDeliveryOptionControl.value

        let addressInfo: AddressInfo = {phone: 0, name: '', address: ''}

        switch(homeDeliveryOption){
          //Existing Address
          case 1:
            const applicantAddress = this.applicantAdressInfo.addresses[0]

            addressInfo.name = this.applicantName
            addressInfo.phone = this.applicantAdressInfo.phone
            addressInfo.address = `${applicantAddress.detail}, ${applicantAddress.district}, ${applicantAddress.canton}, ${applicantAddress.province}`
            addressInfo.addressId = applicantAddress.addressId
          break;
          //New Address
          case 2:
            let province = this.newAdressData.province
            let canton = this.newAdressData.canton
            let district = this.newAdressData.district
            let detail = this.newAdressData.detail

            addressInfo.name = this.newAdressData.name
            addressInfo.phone = this.newAdressData.phoneNumber
            addressInfo.address = `${province.description}, ${canton.description}, ${district.description}, ${detail}`
            addressInfo.province = province.id
            addressInfo.canton = canton.id
            addressInfo.district = district.id
          break;
        }

        return {
          type: 2,
          homeDeliveryOption,
          addressInfo
        }
    }
  }
}
