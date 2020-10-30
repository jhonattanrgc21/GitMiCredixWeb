import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {VehicleType} from 'src/app/shared/models/vehicle-type';
import {HttpService} from 'src/app/core/services/http.service';
import {ConsultVehicle} from '../../../../../shared/models/consult-vehicle';
import {MarchamoService} from '../marchamo.service';
import {CredixToastService} from '../../../../../core/services/credix-toast.service';
import {TagsService} from '../../../../../core/services/tags.service';
import {Tag} from '../../../../../shared/models/tag';


@Component({
  selector: 'app-marchamo-first-step',
  templateUrl: './marchamo-first-step.component.html',
  styleUrls: ['./marchamo-first-step.component.scss']
})
export class MarchamoFirstStepComponent implements OnInit {
  vehicleTypes: VehicleType[];
  consultVehicle: ConsultVehicle;
  step1Tag1: string;
  step1Tag2: string;
  step1Tag3: string;
  step1Tag4: string;
  step1Tag5: string;
  step1Subt: string;

  @Input() consultForm: FormGroup;

  constructor(private httpService: HttpService,
              private toastService: CredixToastService,
              private marchamosService: MarchamoService,
              private tagsService: TagsService) {
  }

  ngOnInit(): void {
    this.getVehicleTypes();
    this.marchamosService.consultVehicle$.subscribe(() => this.consult());
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Marchamo').tags)
    );
  }

  getVehicleTypes() {
    this.marchamosService.getVehiclePlate()
      .subscribe((response) => this.vehicleTypes = response);
  }

  consult() {
    this.marchamosService
      .getConsultVehicle(this.consultForm.controls.vehicleType.value.toString(),
        this.consultForm.controls.plateNumber.value.toUpperCase())
      .subscribe((response) => {
        this.consultVehicle = response.header;
        // this.consultVehicle.amount = typeof response.header.amount === 'string' ?
        //   +response.header.amount.replace('.', '').replace(',', '.') :
        //   response.header.amount;
        this.consultVehicle.amount = response.item.reduce((a, b) => a + b.itemCurrentAmount, 0);
        this.marchamosService.marchamoAmount = this.consultVehicle.amount;
        this.marchamosService.consultVehicle = this.consultVehicle;
        this.marchamosService.billingHistories = response.item;
        this.marchamosService.itemProduct = response.aditionalProducts;
        this.marchamosService.hasAdditionalProducts = response.aditionalProducts && response.aditionalProducts.length > 0;
        if (this.marchamosService.consultVehicle && this.marchamosService.billingHistories) {
          this.marchamosService.emitVehicleConsulted();
        }
      });
  }

  getTags(tags: Tag[]) {
    this.step1Tag1 = tags.find(tag => tag.description === 'marchamo.stepper1.tag1')?.value;
    this.step1Tag2 = tags.find(tag => tag.description === 'marchamo.stepper1.tag2')?.value;
    this.step1Tag3 = tags.find(tag => tag.description === 'marchamo.stepper1.tag3')?.value;
    this.step1Tag4 = tags.find(tag => tag.description === 'marchamo.stepper1.tag4')?.value;
    this.step1Tag5 = tags.find(tag => tag.description === 'marchamo.stepper1.tag5')?.value;
    this.step1Subt = tags.find(tag => tag.description === 'marchamo.stepper1.subtitle')?.value;
  }
}
