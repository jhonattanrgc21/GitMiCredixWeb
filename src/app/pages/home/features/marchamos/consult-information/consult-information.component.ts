import { Component, OnInit, Input } from '@angular/core';
import { ConsultVehicle } from 'src/app/shared/models/consultVehicle.models';

@Component({
  selector: 'consult-information',
  templateUrl: './consult-information.component.html',
  styleUrls: ['./consult-information.component.scss']
})
export class ConsultInformationComponent implements OnInit {


  @Input() consultVehicle: ConsultVehicle;

  constructor() { }

  ngOnInit(): void {
  }

}
