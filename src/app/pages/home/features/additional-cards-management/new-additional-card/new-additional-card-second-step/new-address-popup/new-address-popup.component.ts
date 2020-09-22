import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Province} from '../../../../../../../shared/models/province';
import {Canton} from '../../../../../../../shared/models/canton';
import {District} from '../../../../../../../shared/models/district';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Address} from '../../../../../../../shared/models/address';
import {GlobalApiService} from '../../../../../../../core/services/global-api.service';

@Component({
  selector: 'app-new-address-popup',
  templateUrl: './new-address-popup.component.html',
  styleUrls: ['./new-address-popup.component.scss']
})
export class NewAddressPopupComponent implements OnInit {
  provinces: Province[] = [];
  cantons: Canton[] = [];
  districts: District[] = [];
  newAddressFormGroup: FormGroup = new FormGroup({
    province: new FormControl(null, [Validators.required]),
    canton: new FormControl(null, [Validators.required]),
    district: new FormControl(null, [Validators.required]),
    detail: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required])
  });

  constructor(public dialogRef: MatDialogRef<NewAddressPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private globalApiService: GlobalApiService) {
  }

  ngOnInit(): void {
    this.getProvinces();
    this.onProvinceChanged();
    this.onCantonChanged();

    if (this.data.data?.address) {
      this.newAddressFormGroup.controls.province.setValue(this.data.data.address.province);
      this.newAddressFormGroup.controls.canton.setValue(this.data.data.address.canton);
      this.newAddressFormGroup.controls.district.setValue(this.data.data.address.district);
      this.newAddressFormGroup.controls.detail.setValue(this.data.data.address.detail);
      this.newAddressFormGroup.controls.name.setValue(this.data.data.address.name);
      this.newAddressFormGroup.controls.phoneNumber.setValue(this.data.data.address.phoneNumber);
    }
  }

  getProvinces() {
    this.globalApiService.getProvinces()
      .subscribe(provinces => this.provinces = provinces);
  }

  onProvinceChanged() {
    this.newAddressFormGroup.controls.province.valueChanges.subscribe(value => {
      this.districts = [];
      this.cantons = [];
      this.newAddressFormGroup.controls.district.reset(null, {onlySelf: true, emitEvent: false});
      this.newAddressFormGroup.controls.canton.reset(null, {onlySelf: true, emitEvent: false});
      this.getCantons(value.id);
    });
  }

  getCantons(provinceId: number) {
    this.globalApiService.getCantons(provinceId)
      .subscribe(cantons => this.cantons = cantons);
  }

  onCantonChanged() {
    this.newAddressFormGroup.controls.canton.valueChanges.subscribe(value => {
      this.districts = [];
      this.newAddressFormGroup.controls.district.reset(null, {onlySelf: true, emitEvent: false});
      this.getDistricts(value.id);
    });
  }

  getDistricts(cantonId: number) {
    this.globalApiService.getDistricts(cantonId).subscribe(districts => this.districts = districts);
  }

  submit() {
    if (this.newAddressFormGroup.valid) {
      this.dialogRef.close({
        province: this.newAddressFormGroup.controls.province.value,
        canton: this.newAddressFormGroup.controls.canton.value,
        district: this.newAddressFormGroup.controls.district.value,
        detail: this.newAddressFormGroup.controls.detail.value,
        phoneNumber: this.newAddressFormGroup.controls.phoneNumber.value,
        name: this.newAddressFormGroup.controls.name.value
      } as Address);
    }
  }
}
