import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpService} from 'src/app/core/services/http.service';
import {ModalService} from 'src/app/core/services/modal.service';
import {CdkStepper} from '@angular/cdk/stepper';
import {StorageService} from 'src/app/core/services/storage.service';
import {MarchamoService} from './marchamo.service';
import {TagsService} from '../../../../core/services/tags.service';
import {Tag} from '../../../../shared/models/tag';
import {finalize} from 'rxjs/operators';
import {CredixCodeErrorService} from '../../../../core/services/credix-code-error.service';
import { ConsultVehicle } from 'src/app/shared/models/consult-vehicle';

@Component({
  selector: 'app-marchamos',
  templateUrl: './marchamo.component.html',
  styleUrls: ['./marchamo.component.scss']
})
export class MarchamoComponent implements OnInit, OnDestroy {
  consultForm: FormGroup = new FormGroup({
    vehicleType: new FormControl(null, [Validators.required]),
    plateNumber: new FormControl(null, [Validators.required])
  });
  secureAndQuotesForm: FormGroup = new FormGroup({
    additionalProducts: new FormArray([]),
    quota: new FormControl(null),
    quotaId: new FormControl(null),
    firstQuotaDate: new FormControl(null)
  });
  pickUpForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    deliveryPlace: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null),
    person: new FormControl(null)
  });
  confirmForm: FormGroup = new FormGroup({
    credixCode: new FormControl(null, [Validators.required])
  });
  plateNumber: string;
  name: string;
  email: string;
  phoneNumber: number;
  address: string;
  stepperIndex = 0;
  commission = 0;
  iva = 0;
  marchamoTotal = 0;
  total = 0;
  done = false;
  disableButton = true;
  today = new Date();
  promoStatus: any;
  message: string;
  status: 'success' | 'error';
  title: string;
  step1: string;
  step4: string;
  step3: string;
  step2: string;
  resumeTag1: string;
  deliveryPlaceId: number;
  ownerEmail: string;
  firstPayment: string;
  consultVehicle: ConsultVehicle;
  validaIVA = false;
  @ViewChild('stepper') stepper: CdkStepper;

  constructor(private httpService: HttpService,
              private marchamosService: MarchamoService,
              private modalService: ModalService,
              private storageService: StorageService,
              private tagsService: TagsService,
              private credixCodeErrorService: CredixCodeErrorService) {
  }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Marchamo').tags));
    this.checkNextStep();
    this.getCredixCodeError();
    console.log(this.validaIVA);
  }

  continue() {
    this.stepper.next();
    this.stepperIndex = this.stepper.selectedIndex;
    this.checkNextStep();
  }

  back() {
    this.stepper.previous();
    this.stepperIndex = this.stepper.selectedIndex;
    this.checkNextStep();
    this.confirmForm.controls.credixCode.reset(null, {emitEvent: false});
    this.pickUpForm.controls.deliveryPlace.reset(null, {emitEvent: false});
  }

  checkNextStep() {
    switch (this.stepperIndex) {
      case 0:
        this.disableButton = !this.marchamosService.consultVehicle && !this.marchamosService.billingHistories;
        localStorage.removeItem('iva');
        localStorage.removeItem('delivery');
        localStorage.removeItem('delivery2');
        this.marchamosService.vehicleConsulted$
          .subscribe(() => this.disableButton = !this.marchamosService.consultVehicle && !this.marchamosService.billingHistories);
        break;
      case 1:
        this.plateNumber = this.marchamosService.consultVehicle.plateNumber;
        this.marchamoTotal = this.marchamosService.consultVehicle.amount;
        this.disableButton = this.secureAndQuotesForm.invalid;
        this.secureAndQuotesForm.valueChanges.subscribe(() => this.disableButton = this.secureAndQuotesForm.invalid);
        break;
      case 2:
        this.disableButton = this.pickUpForm.invalid;
        this.pickUpForm.valueChanges.subscribe(() => this.disableButton = this.pickUpForm.invalid);
        break;
      case 3:
        this.name = this.pickUpForm.controls.person.value;
        this.phoneNumber = this.pickUpForm.controls.phoneNumber?.value;
        this.email = this.pickUpForm.controls.email.value;
        this.address = this.pickUpForm.controls.address.value;
        this.disableButton = this.confirmForm.invalid;
        this.confirmForm.valueChanges.subscribe(() => this.disableButton = this.confirmForm.invalid);
        break;
    }
  }

  consult() {
    this.marchamosService.consultNewVehicle();
  }

  setSoaPay() {
    this.marchamosService.setSoaPay(
      this.secureAndQuotesForm.controls.additionalProducts.value,
      this.deliveryPlaceId,
      this.pickUpForm.controls.person.value,
      this.pickUpForm.controls.phoneNumber.value.toString(),
      this.pickUpForm.controls.address.value,
      this.pickUpForm.controls.email.value,
      this.firstPayment,
      +this.consultForm.controls.vehicleType.value,
      this.consultForm.controls.plateNumber.value.toUpperCase(),
      !this.secureAndQuotesForm.controls.firstQuotaDate.value ?
        0 : this.secureAndQuotesForm.controls.firstQuotaDate.value,
      !this.secureAndQuotesForm.controls.quotaId.value ?
        0 : this.secureAndQuotesForm.controls.quotaId.value,
      this.pickUpForm.controls.phoneNumber.value,
      this.ownerEmail,
      this.confirmForm.controls.credixCode.value
    )
      .pipe(finalize(() => {
        this.done = true;
        this.confirmForm.controls.credixCode.reset(null, {emitEvent: false});
      }))
      .subscribe(response => {
        this.status = response.type;
        this.message = response.message;
        this.total = this.marchamosService.total;
      });
  }

  getConsultVehicle() {
    this.marchamosService
      .getConsultVehicle(this.consultForm.controls.vehicleType.value.toString(),
        this.consultForm.controls.plateNumber.value.toUpperCase(),
        this.secureAndQuotesForm.controls.additionalProducts.value)
          .pipe(finalize(() => this.setSoaPay()))
            .subscribe((response) => {
              this.consultVehicle = response.header;
              this.marchamosService.consultVehicle = this.consultVehicle;
            });
  }

  secureToPay() {
    this.deliveryPlaceId = this.pickUpForm.controls.deliveryPlace.value === null ?
      6 : this.pickUpForm.controls.deliveryPlace.value;
    this.ownerEmail= this.marchamosService.ownerPayer.email === '' ?
      this.pickUpForm.controls.email.value : this.marchamosService.ownerPayer.email;
    this.firstPayment = !this.secureAndQuotesForm.controls.firstQuotaDate.value ?
      '' : this.marchamosService.payments
        .find(elem => elem.promoStatus === this.secureAndQuotesForm.controls.firstQuotaDate.value).paymentDate;

    this.getConsultVehicle();

  }

  confirmModal() {
    this.modalService.confirmationPopup('¿Desea realizar este pago?').subscribe(event => {
      if (event) {
        this.secureToPay();
      } else {
        this.stepperIndex = 3;
      }
    });
  }

  redirectTemplate() {
    this.done = false;
    this.stepperIndex = 0;
  }

  getTags(tags: Tag[]) {
    this.title = tags.find(tag => tag.description === 'marchamo.title')?.value;
    this.resumeTag1 = tags.find(tag => tag.description === 'marchamo.resumen.tag1')?.value;
    this.step1 = tags.find(tag => tag.description === 'marchamo.stepper1')?.value;
    this.step2 = tags.find(tag => tag.description === 'marchamo.stepper2')?.value;
    this.step3 = tags.find(tag => tag.description === 'marchamo.stepper3')?.value;
    this.step4 = tags.find(tag => tag.description === 'marchamo.stepper4')?.value;
  }

  getCredixCodeError() {
    this.credixCodeErrorService.credixCodeError$.subscribe(() => {
      this.confirmForm.controls.credixCode.setErrors({invalid: true});
      this.confirmForm.updateValueAndValidity();
    });
  }

  ngOnDestroy(): void {
    this.marchamosService.unsubscribe();
  }
}
