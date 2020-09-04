import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {VehicleType} from 'src/app/shared/models/vehicleType.models';
import {HttpService} from 'src/app/core/services/http.service';
import {ConsultVehicle} from '../../../../../shared/models/consultVehicle.models';
import {MarchamosService} from '../marchamos.service';
import {CredixToastService} from '../../../../../core/services/credix-toast.service';

@Component({
  selector: 'app-marchamo-first-step',
  templateUrl: './marchamo-first-step.component.html',
  styleUrls: ['./marchamo-first-step.component.scss']
})
export class MarchamoFirstStepComponent implements OnInit {
  vehicleTypes: VehicleType[];
  consultVehicle: ConsultVehicle;
  @Input() consultForm: FormGroup;

  constructor(private httpService: HttpService,
              private toastService: CredixToastService,
              private marchamosService: MarchamosService) {
  }

  ngOnInit(): void {
    this.getVehicleTypes();
    this.marchamosService.consultMarchamos.subscribe(() => this.consult());
  }

  getVehicleTypes() {
    this.httpService.post('marchamos', 'pay/platetypes', {channelId: 102})
      .subscribe(response => {
        this.vehicleTypes = response.plateTypesList;
      });
  }

  consult() {
    this.httpService.post('marchamos', 'pay/vehicleconsult', {
      channelId: 102,
      plateClassId: this.consultForm.controls.vehicleType.value.toString(),
      plateNumber: this.consultForm.controls.plateNumber.value.toUpperCase(),
      aditionalProducts: [
        //  {
        //    productCode: 5
        //  },
        //  {
        //    productCode: 6
        //  },
        //  {
        //    productCode: 8
        //  }
      ]
    }).subscribe(response => {
      if (response.type === 'success') {
        this.consultVehicle = response.REQUESTRESULT.soaResultVehicleConsult.header;
        this.consultVehicle.amount = typeof response.REQUESTRESULT.soaResultVehicleConsult.header.amount === 'string' ?
          +response.REQUESTRESULT.soaResultVehicleConsult.header.amount.replace('.', '').replace(',', '.') :
          response.REQUESTRESULT.soaResultVehicleConsult.header.amount;
        this.marchamosService.emitConsultVehicleAndHistory(this.consultVehicle, response.REQUESTRESULT.soaResultVehicleConsult.item);
      } else {
        this.toastService.show({text: response.message, type: 'error'});
      }
    });
  }

}
