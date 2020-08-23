import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { VehicleType } from 'src/app/shared/models/vehicleType.models';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'marchamo-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss']
})
export class FirstStepComponent implements OnInit {

  vehicleType: VehicleType[];

  @Input() consultForm: FormGroup;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getVehicleType();
  }

  get consultControls() {
    return this.consultForm.controls;
  }

  getVehicleType() {
    this.httpService.post('marchamos', 'pay/platetypes', {channelId: 102})
      .subscribe(response => {
        this.vehicleType = response.plateTypesList;
      });
  }
}
