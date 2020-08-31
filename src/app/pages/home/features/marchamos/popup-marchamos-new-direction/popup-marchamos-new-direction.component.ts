import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpService} from 'src/app/core/services/http.service';

@Component({
  selector: 'app-popup-marchamos-new-direction',
  templateUrl: './popup-marchamos-new-direction.component.html',
  styleUrls: ['./popup-marchamos-new-direction.component.scss']
})
export class PopupMarchamosNewDirectionComponent implements OnInit {

  provinces: any[];
  cantons: any[];
  districs: any[];


  newDeliveryForm: FormGroup = new FormGroup({
    province: new FormControl('', [Validators.required]),
    canton: new FormControl('', [Validators.required]),
    distric: new FormControl('', [Validators.required]),
    exactlyDirection: new FormControl('', [Validators.required]),
    personReceive: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<PopupMarchamosNewDirectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private httpService: HttpService) {
  }

  get newDeliveryControls() {
    return this.newDeliveryForm.controls;
  }

  ngOnInit(): void {
    if (this.data.data !== undefined) {
      this.getCantons(this.data.data.province);
      this.getDistrict(this.data.data.canton);
      this.editFormUpdate(this.data.data);
    }

    this.getProvinces();
    this.newDeliveryForm.get('province').valueChanges.subscribe(value => {
      this.getCantons(value);
    });
    this.newDeliveryForm.get('canton').valueChanges.subscribe(value => {
      this.getDistrict(value);
    });
  }

  getProvinces() {
    this.httpService.post('canales', 'global/listprovinces')
      .subscribe(response => {
        this.provinces = response;
      });
  }

  getCantons(provinceId: number) {

    this.httpService.post('canales', 'global/listcantons',
      {
        channelId: 102,
        provinceId
      }).subscribe(response => {
      this.cantons = response;
    });
  }

  getDistrict(cantonId: number) {
    this.httpService.post('canales', 'global/listdistricts',
      {
        cantonId,
        channelId: 102
      })
      .subscribe(response => {
        this.districs = response;
      });
  }

  editFormUpdate(data: any) {
    this.newDeliveryControls.province.patchValue(data.province);
    this.newDeliveryControls.canton.patchValue(data.canton);
    this.newDeliveryControls.distric.patchValue(data.distric);
    this.newDeliveryControls.exactlyDirection.patchValue(data.exactlyDirection);
    this.newDeliveryControls.personReceive.patchValue(data.personReceive);
    this.newDeliveryControls.phoneNumber.patchValue(data.phoneNumber);
  }

  submit() {
    this.dialogRef.close(this.newDeliveryForm.value);
  }
}
