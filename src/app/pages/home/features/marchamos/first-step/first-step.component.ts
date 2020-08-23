import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {VehicleType} from 'src/app/shared/models/vehicleType.models';
import {HttpService} from 'src/app/core/services/http.service';

@Component({
  selector: 'marchamo-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss']
})
export class FirstStepComponent implements OnInit {

  vehicleType: VehicleType[];

  @Input() consultForm: FormGroup;
  @Output() consultFormChange: EventEmitter<FormGroup>;

  constructor(private httpService: HttpService) {
  }

  get consultControls() {
    return this.consultForm.controls;
  }

  ngOnInit(): void {
    this.getVehicleType();
  }

  getVehicleType() {
    this.httpService.post('marchamos', 'pay/platetypes', {channelId: 102})
      .subscribe(response => {
        this.vehicleType = response.plateTypesList;
      });
  }
}
