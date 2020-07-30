import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/core/services/http.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { VehicleType } from 'src/app/shared/models/vehicleType.models';
import { CdkStepper } from '@angular/cdk/stepper';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-marchamos',
  templateUrl: './marchamos.component.html',
  styleUrls: ['./marchamos.component.scss']
})
export class MarchamosComponent implements OnInit {

  vehicleType: VehicleType[];
  vehicleInformation: boolean;

  consultForm: FormGroup = new FormGroup({
    VehicleType: new FormControl('',/*[Validators.required]*/),
    plateNumber: new FormControl('',/*[Validators.required]*/)
  });


  @ViewChild('stepper') stepper: CdkStepper;

  constructor(
    private httpService: HttpService,
    private modalService: ModalService
    ) { }

  ngOnInit(): void {
    this.getVehicleType();
  }

  consult(){

  }

  continue(){
    this.stepper.next();
  }

  getVehicleType(){
    this.httpService.post('marchamos', 'pay/platetypes', {channelId: 102}).subscribe( response => console.log(response));
  }
}
