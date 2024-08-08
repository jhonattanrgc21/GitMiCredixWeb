import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GlobalApiService} from '../../../../../core/services/global-api.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Canton} from '../../../../../shared/models/canton';
import {District} from '../../../../../shared/models/district';
import {Province} from '../../../../../shared/models/province';
import {Address} from '../../../../../shared/models/address';
  @Component({
    selector: 'adress-step-component',
    templateUrl: './adress-step.component.html',
    styleUrls: ['./adress-step.component.scss']
  })
  export class AdressStepComponent implements OnInit {
    @Input() newAddressFormGroup: FormGroup = new FormGroup({
      province: new FormControl(null, [Validators.required]),
      canton: new FormControl(null, [Validators.required]),
      district: new FormControl(null, [Validators.required]),
      detail: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [Validators.required])
    });
    provinces: Province[] = [];
    cantons: Canton[] = [];
    districts: District[] = [];
  
    constructor(@Inject(MAT_DIALOG_DATA) public data,
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
      this.globalApiService.getProvinces().subscribe(provinces => this.provinces = provinces);
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
  
  
  }