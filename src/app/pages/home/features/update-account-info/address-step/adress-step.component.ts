import {Component, Input, OnInit} from '@angular/core';
import {GlobalApiService} from '../../../../../core/services/global-api.service';
import { FormGroup } from '@angular/forms';
import {Canton} from '../../../../../shared/models/canton';
import {District} from '../../../../../shared/models/district';
import {Province} from '../../../../../shared/models/province';
  @Component({
    selector: 'adress-step-component',
    templateUrl: './adress-step.component.html',
    styleUrls: ['./adress-step.component.scss']
  })
  export class AdressStepComponent implements OnInit {
    @Input() newAddressFormGroup: FormGroup;
    provinces: Province[] = [];
    cantons: Canton[] = [];
    districts: District[] = [];

    constructor(private globalApiService: GlobalApiService) {
    }

    ngOnInit(): void {
      this.getProvinces();
      this.onProvinceChanged();
      this.onCantonChanged();
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
        this.getCantons(value);
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
        this.getDistricts(value);
      });
    }

    getDistricts(cantonId: number) {
      this.globalApiService.getDistricts(cantonId).subscribe(districts => this.districts = districts);
    }


  }
