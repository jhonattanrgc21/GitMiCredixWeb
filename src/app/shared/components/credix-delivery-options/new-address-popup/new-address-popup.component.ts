import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { GlobalApiService } from 'src/app/core/services/global-api.service';
import { Address } from 'src/app/shared/models/address';
import { Canton } from 'src/app/shared/models/canton';
import { District } from 'src/app/shared/models/district';
import { Province } from 'src/app/shared/models/province';

@Component({
  selector: 'renew-card-new-address-popup',
  templateUrl: './new-address-popup.component.html',
  styleUrls: ['./new-address-popup.component.scss']
})
export class NewAddressPopupComponent implements OnInit {

  provinces: Province[] = [];
  cantons: Canton[] = [];
  districts: District[] = [];

  newAddressFormGroup = this.fb.group({
    province: [null, Validators.required],
    district: [null, Validators.required],
    canton: [null, Validators.required],
    detail: [null, Validators.required],
    name: [null, Validators.required],
    phoneNumber: [null, Validators.required]
  })

  applicantAdressInfo: Address;

  constructor(
    public dialogRef: MatDialogRef<NewAddressPopupComponent>,
    private fb: FormBuilder,
    private globalApiService: GlobalApiService,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.applicantAdressInfo = data.data?.applicantAddressInfo
    }

  ngOnInit(): void {
    this.getProvinces();
    this.onProvinceChanged();
    this.onCantonChanged();

    if(!this.applicantAdressInfo){
      this.newAddressFormGroup.controls.canton.disable()
      this.newAddressFormGroup.controls.district.disable()
    } else {
      this.loadFormData()
    }
  }

  loadFormData(){
    this.newAddressFormGroup.controls.province.setValue(this.applicantAdressInfo.province);
      this.newAddressFormGroup.controls.canton.setValue(this.applicantAdressInfo.canton);
      this.newAddressFormGroup.controls.district.setValue(this.applicantAdressInfo.district);
      this.newAddressFormGroup.controls.detail.setValue(this.applicantAdressInfo.detail);
      this.newAddressFormGroup.controls.name.setValue(this.applicantAdressInfo.name);
      this.newAddressFormGroup.controls.phoneNumber.setValue(this.applicantAdressInfo.phoneNumber);
  }

  getProvinces() {
    this.globalApiService.getProvinces().subscribe(provinces => this.provinces = provinces);
  }

  onProvinceChanged() {
    this.newAddressFormGroup.controls.province.valueChanges
    .pipe(
      filter(value => !!value)
    )
    .subscribe(value => {
      this.cantons = [];
      this.districts = [];
      this.newAddressFormGroup.controls.canton.enable()
      this.newAddressFormGroup.controls.canton.reset(null, { onlySelf: true, emitEvent: false });
      this.newAddressFormGroup.controls.district.reset(null, { onlySelf: true, emitEvent: false });
      this.newAddressFormGroup.controls.district.disable()
      this.getCantons(value.id);
    });
  }

  getCantons(provinceId: number) {
    this.globalApiService.getCantons(provinceId)
      .subscribe(cantons => this.cantons = cantons);
  }

  onCantonChanged() {
    this.newAddressFormGroup.controls.canton.valueChanges
    .pipe(
      filter(value => !!value)
    )
    .subscribe(value => {
      this.districts = [];
      this.newAddressFormGroup.controls.district.enable()
      this.newAddressFormGroup.controls.district.reset(null, { onlySelf: true, emitEvent: false });
      this.getDistricts(value.id);
    });
  }

  getDistricts(cantonId: number) {
    this.globalApiService.getDistricts(cantonId).subscribe(districts => this.districts = districts);
  }

  saveNewAddress(){
    if(this.newAddressFormGroup.invalid) return
    this.dialogRef.close( this.newAddressFormGroup.value )
  }

}
