import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/core/services/http.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-popup-marchamos-new-direction',
  templateUrl: './popup-marchamos-new-direction.component.html',
  styleUrls: ['./popup-marchamos-new-direction.component.scss']
})
export class PopupMarchamosNewDirectionComponent implements OnInit{

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
    private httpService: HttpService) { }


  ngOnInit(): void {
    this.getProvinces();
    this.newDeliveryForm.get('province').valueChanges.subscribe(value => { this.getCantons(value);});
    this.newDeliveryForm.get('canton').valueChanges.subscribe(value => { this.getDistrict(value);});

    
  }

  getProvinces(){
    this.httpService.post('canales','global/listprovinces')
    .subscribe(response => {
      console.log(response);
      this.provinces = response;
    })
  }

  getCantons(provinceId:number){
    
    this.httpService.post('canales','global/listcantons',
    {
      channelId: 102,
      provinceId:provinceId
    }).subscribe(response => { 
      console.log(response);
      this.cantons = response;
    })
  }

  getDistrict(cantonId:number){
    this.httpService.post('canales', 'global/listdistricts', 
    {
      cantonId : cantonId,
      channelId : 102
    })
    .subscribe(response => { 
        console.log(response)
        this.districs = response;
      ;});
  }

  submit(){
    this.dialogRef.close(this.newDeliveryForm.value);
  }
}
