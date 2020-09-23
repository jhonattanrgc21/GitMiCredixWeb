import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalService} from 'src/app/core/services/modal.service';
import {MarchamosService} from '../marchamos.service';
import {PopupMarchamosNewDirectionComponent} from '../popup-marchamos-new-direction/popup-marchamos-new-direction.component';
import {DeliveryPlace} from 'src/app/shared/models/delivery-place';
import {HttpService} from 'src/app/core/services/http.service';
import {StorageService} from 'src/app/core/services/storage.service';
import {TagsService} from '../../../../../core/services/tags.service';
import {Tag} from '../../../../../shared/models/tag';

@Component({
  selector: 'app-marchamo-third-step',
  templateUrl: './marchamo-third-step.component.html',
  styleUrls: ['./marchamo-third-step.component.scss']
})
export class MarchamoThirdStepComponent implements OnInit, OnChanges {
  @Input() pickUpForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email]),
    pickUp: new FormControl(null, []),
    domicile: new FormArray([])
  });
  @Input() isActive = false;
  executed = false;
  deliveryPlaces: DeliveryPlace[];
  radioButtonsChangedValue: number;
  newDeliveryOption: string;
  newDeliveryDirection: {
    canton: number,
    distric: number,
    exactlyDirection: string,
    personReceive: string,
    phoneNumber: number,
    province: number
  } = null;
  domicile = false;
  newDomicile = false;
  domicileDescription: { name: string, detail?: string, province?: number, canton?: number, distric?: number, number: number } = null;
  addressAplicant: any[] = [];
  informationApplicant: any;
  step3Subt2: string;
  step3Opt1Opt2: string;
  step3Opt1Opt1: string;
  step3Opt1: string;
  step3Opt2: string;
  step3Subt1: string;


  constructor(private httpService: HttpService,
              private modalService: ModalService,
              private marchamoService: MarchamosService,
              private storageService: StorageService,
              private tagsService: TagsService
  ) {
  }

  ngOnInit(): void {
    this.pickUpForm.controls.pickUp.valueChanges.subscribe(value => {
      this.marchamoService.emitPickUpStoreId(value);
    });
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Marchamo').tags)
    );

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isActive && this.isActive && !this.executed) {
      this.executed = true;
      this.getPickUpStore();
      this.getUserAplicantAccountNumber();
    }
  }


  getTags(tags: Tag[]) {
    this.step3Subt2 = tags.find(tag => tag.description === 'marchamos.stepper3.subtitle2').value;
    this.step3Opt1Opt2 = tags.find(tag => tag.description === 'marchamos.stepper3.option1.option2').value;
    this.step3Opt1Opt1 = tags.find(tag => tag.description === 'marchamos.stepper3.option1.option1').value;
    this.step3Opt1 = tags.find(tag => tag.description === 'marchamos.stepper3.option1').value;
    this.step3Opt2 = tags.find(tag => tag.description === 'marchamos.stepper3.option2').value;
    this.step3Subt1 = tags.find(tag => tag.description === 'marchamos.stepper3.subtitle1').value;
  }

  getPickUpStore() {
    this.httpService.post('marchamos', 'pay/deliveryplaces', {channelId: 102})
      .subscribe(response => {
        this.deliveryPlaces = response.deliveryPlacesList.filter(x => x.id !== 6);
      });
  }

  getUserAplicantAccountNumber() {
    this.httpService.post('canales', 'applicant/finduserapplicantaccountnumber', {
      channelId: 102,
      accountNumber: this.storageService.getCurrentUser().accountNumber
    }).subscribe(response => {
      this.pickUpForm.controls.email.setValue(response.informationApplicant.applicant.email);
      this.informationApplicant = response.informationApplicant.applicant;
      this.addressAplicant = response.informationApplicant.applicant.addressApplicant;
    });
  }


  newDirection(data?) {
    this.modalService.open({
      component: PopupMarchamosNewDirectionComponent,
      hideCloseButton: false,
      title: 'Nueva dirección de entrega',
      data
    }, {width: 380, height: 614, disableClose: false})
      .afterClosed()
      .subscribe(value => {
        this.newDeliveryDirection = {
          canton: value.canton,
          distric: value.distric,
          exactlyDirection: value.exactlyDirection,
          personReceive: value.personReceive,
          phoneNumber: value.phoneNumber,
          province: value.province
        };
        this.marchamoService.emitNewDeliveryDirection(
          this.newDeliveryDirection.personReceive,
          this.newDeliveryDirection.phoneNumber,
          this.pickUpForm.controls.email.value,
          this.newDeliveryDirection.exactlyDirection,
          this.newDeliveryDirection.province,
          this.newDeliveryDirection.canton,
          this.newDeliveryDirection.distric,
        );
      });
  }

  getRadioButtonsChecked(event) {
    this.radioButtonsChangedValue = event.value;

    if (event.value === 2 && event.checked) {
      this.domicileDescription = {
        name: this.informationApplicant.printName,
        number: (this.informationApplicant.phoneApplicant[0].phoneType.id === 1) ? this.informationApplicant.phoneApplicant[0].phone : ''
      };

      this.marchamoService.emitDomicileDescription(this.domicileDescription.name, this.domicileDescription.number,
        this.pickUpForm.controls.email.value);
    }


    if (event.value === 1 && event.checked) {
      if (this.addressAplicant.find(add => add.addressType.id = 2)) {
        this.domicile = true;
        this.domicileDescription = {
          name: this.informationApplicant.printName,
          detail: this.addressAplicant.find(add => add.addressType.id = 2).detail,
          province: this.addressAplicant.find(add => add.addressType.id = 2).province.description,
          canton: this.addressAplicant.find(add => add.addressType.id = 2).canton.description,
          distric: this.addressAplicant.find(add => add.addressType.id = 2).district.description,
          number: (this.informationApplicant.phoneApplicant.find(pho => pho.phoneType.id = 1)) ?
            this.informationApplicant.phoneApplicant.find(pho => pho.phoneType.id = 1).phone : ''
        };

        this.marchamoService.emitDomicileDescription(this.domicileDescription.name, this.domicileDescription.number,
          this.pickUpForm.controls.email.value, this.domicileDescription.detail, this.domicileDescription.province,
          this.domicileDescription.canton, this.domicileDescription.distric);
      } else {
        this.newDirection();
      }
    }
  }

  newDirectionChecked(event) {
    if (event.value === 'newDirection' && event.checked) {
      this.newDirection();
    }
  }

  editNewDirection() {
    this.newDirection(this.newDeliveryDirection);
  }
}
