import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpService} from 'src/app/core/services/http.service';
import {ModalService} from 'src/app/core/services/modal.service';
import {CdkStepper} from '@angular/cdk/stepper';
import {StorageService} from 'src/app/core/services/storage.service';
import {MarchamoService} from './marchamo.service';
import {TagsService} from '../../../../core/services/tags.service';
import {Tag} from '../../../../shared/models/tag';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-marchamos',
  templateUrl: './marchamo.component.html',
  styleUrls: ['./marchamo.component.scss']
})
export class MarchamoComponent implements OnInit {
  consultForm: FormGroup = new FormGroup({
    vehicleType: new FormControl(null, [Validators.required]),
    plateNumber: new FormControl(null, [Validators.required])
  });
  secureAndQuotesForm: FormGroup = new FormGroup({
    additionalProducts: new FormArray([]),
    quota: new FormControl(null, [Validators.required]),
    quotaId: new FormControl(null, [Validators.required]),
    firstQuotaDate: new FormControl(null, [Validators.required])
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
  totalAmountItemsProducts = 0;
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
  @ViewChild('stepper') stepper: CdkStepper;

  constructor(private httpService: HttpService,
              private marchamosService: MarchamoService,
              private modalService: ModalService,
              private storageService: StorageService,
              private tagsService: TagsService) {
  }

  ngOnInit(): void {
    this.checkNextStep();
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Marchamo').tags)
    );
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
  }

  checkNextStep() {
    switch (this.stepperIndex) {
      case 0:
        this.disableButton = !this.marchamosService.consultVehicle && !this.marchamosService.billingHistories;
        this.marchamosService.vehicleConsulted$.subscribe(() => {
          this.disableButton = !this.marchamosService.consultVehicle && !this.marchamosService.billingHistories;
        });
        break;
      case 1:
        this.getPromo();
        this.plateNumber = this.marchamosService.consultVehicle.plateNumber;
        this.marchamoTotal = this.marchamosService.marchamoAmount;
        this.disableButton = this.secureAndQuotesForm.invalid;
        this.secureAndQuotesForm.valueChanges.subscribe(() => {
          this.disableButton = this.secureAndQuotesForm.invalid;
        });
        break;
      case 2:
        this.disableButton = this.pickUpForm.invalid;
        this.pickUpForm.valueChanges.subscribe(() => {
          this.disableButton = this.pickUpForm.invalid;
        });
        break;
      case 3:
        this.name = this.pickUpForm.controls.person.value;
        this.phoneNumber = this.pickUpForm.controls.phoneNumber?.value;
        this.email = this.pickUpForm.controls.email.value;
        this.address = this.pickUpForm.controls.address.value;
        this.disableButton = this.confirmForm.invalid;
        this.confirmForm.valueChanges.subscribe(() => {
          this.disableButton = this.confirmForm.invalid;
        });
        break;
    }
  }

  consult() {
    this.marchamosService.consultNewVehicle();
  }

  getPromo() {
    this.marchamosService.getPromoApply()
      .subscribe((response) => {
        this.promoStatus = {
          promoStatusId: response[0].promoStatus,
          paymentDate: response[0].paymentDate
        };
      });
  }

  secureToPay() {
    this.marchamosService.setSoaPay(this.secureAndQuotesForm.controls.additionalProducts.value,
      this.pickUpForm.controls.deliveryPlace.value === null ? 1 : this.pickUpForm.controls.deliveryPlace.value,
      this.pickUpForm.controls.person.value,
      this.pickUpForm.controls.phoneNumber.value,
      this.pickUpForm.controls.address.value,
      this.pickUpForm.controls.email.value,
      this.secureAndQuotesForm.controls.firstQuotaDate.value,
      +this.consultForm.controls.vehicleType.value,
      this.consultForm.controls.plateNumber.value.toUpperCase(),
      this.promoStatus.promoStatusId,
      this.secureAndQuotesForm.controls.quotaId.value)
      .pipe(finalize(() => this.done = true))
      .subscribe(response => {
        this.status = response.type;
        this.message = response.message;
      });
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

  getTags(tags: Tag[]) {
    this.title = tags.find(tag => tag.description === 'marchamo.title')?.value;
    this.resumeTag1 = tags.find(tag => tag.description === 'marchamo.resumen.tag1')?.value;
    this.step1 = tags.find(tag => tag.description === 'marchamo.stepper1')?.value;
    this.step2 = tags.find(tag => tag.description === 'marchamo.stepper2')?.value;
    this.step3 = tags.find(tag => tag.description === 'marchamo.stepper3')?.value;
    this.step4 = tags.find(tag => tag.description === 'marchamo.stepper4')?.value;
  }

  changeTemplate(confirm: boolean) {
    this.done = confirm;
    this.stepperIndex = (this.done === false) ? 0 : this.stepper.selectedIndex;
  }

}
