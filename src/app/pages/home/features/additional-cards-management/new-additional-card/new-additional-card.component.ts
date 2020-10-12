import {Component, OnInit, ViewChild} from '@angular/core';
import {AdditionalCardsManagementService} from '../additional-cards-management.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CdkStepper} from '@angular/cdk/stepper';
import {ModalService} from '../../../../../core/services/modal.service';
import {Router} from '@angular/router';
import {TagsService} from '../../../../../core/services/tags.service';
import {Tag} from '../../../../../shared/models/tag';
import {finalize} from 'rxjs/operators';
import {CredixCodeErrorService} from '../../../../../core/services/credix-code-error.service';

@Component({
  selector: 'app-new-additional-card',
  templateUrl: './new-additional-card.component.html',
  styleUrls: ['./new-additional-card.component.scss']
})
export class NewAdditionalCardComponent implements OnInit {
  userInfoFormGroup: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    identificationType: new FormControl(null, [Validators.required]),
    identification: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    birthday: new FormControl(null, [Validators.required]),
    creditLimit: new FormControl(null, [Validators.required])
  });
  pickUpPlaceFormGroup: FormGroup = new FormGroup({
    address: new FormControl(null, [Validators.required])
  });
  confirmFormGroup: FormGroup = new FormGroup({
    credixCode: new FormControl(null, [Validators.required])
  });
  @ViewChild('stepper') stepper: CdkStepper;
  done = false;
  disableButton = true;
  stepperIndex = 0;
  status: 'success' | 'error';
  message: string;
  title: string;
  titleTag: string;
  firstStepperTag: string;
  secondStepperTag: string;
  thirdStepperTag: string;

  constructor(private additionalCardsManagementService: AdditionalCardsManagementService,
              private credixCodeErrorService: CredixCodeErrorService,
              private modalService: ModalService,
              private tagsService: TagsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.checkStep();
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Tarjetas adicionales').tags));
    this.credixCodeErrorService.credixCodeError$.subscribe(() => {
      this.confirmFormGroup.controls.credixCode.setErrors({invalid: true});
      this.confirmFormGroup.updateValueAndValidity();
    });
  }

  goBack() {
    this.router.navigate(['/home/additional-cards-management']);
  }

  back() {
    if (this.stepperIndex === 0) {
      this.goBack();
    } else {
      this.stepper.previous();
      this.stepperIndex = this.stepper.selectedIndex;
      this.checkStep();
    }
  }

  continue() {
    this.stepper.next();
    this.stepperIndex = this.stepper.selectedIndex;
    this.checkStep();
  }

  checkStep() {
    switch (this.stepperIndex) {
      case 0:
        this.disableButton = this.userInfoFormGroup.invalid;
        this.userInfoFormGroup.valueChanges.subscribe(() => this.disableButton = this.userInfoFormGroup.invalid);
        break;
      case 1:
        this.disableButton = this.pickUpPlaceFormGroup.invalid;
        this.pickUpPlaceFormGroup.valueChanges.subscribe(() => this.disableButton = this.pickUpPlaceFormGroup.invalid);
        break;
      case 2:
        this.disableButton = this.confirmFormGroup.invalid;
        this.confirmFormGroup.valueChanges.subscribe(() => this.disableButton = this.confirmFormGroup.invalid);
        break;
    }
  }

  openModal() {
    this.modalService.confirmationPopup('¿Desea realizar la solicitud de tarjeta adicional?').subscribe(response => {
      if (response) {
        this.submit();
      }
    });
  }

  submit() {
    const birthday = this.userInfoFormGroup.controls.birthday.value as Date;
    this.additionalCardsManagementService.saveAdditionalCard(
      this.userInfoFormGroup.controls.name.value,
      this.userInfoFormGroup.controls.lastName.value,
      this.userInfoFormGroup.controls.identificationType.value,
      this.userInfoFormGroup.controls.identification.value,
      this.userInfoFormGroup.controls.phoneNumber.value.toString(),
      this.userInfoFormGroup.controls.email.value,
      // tslint:disable-next-line:max-line-length
      `${birthday.getFullYear()}${birthday.getMonth() < 10 ? '0' + (birthday.getMonth() + 1) : birthday.getMonth() + 1}${birthday.getDate() < 10 ? '0' + (birthday.getDate() + 1) : birthday.getDate() + 1}`,
      +this.userInfoFormGroup.controls.creditLimit.value,
      this.pickUpPlaceFormGroup.controls.address.value,
      this.confirmFormGroup.controls.credixCode.value
    ).pipe(finalize(() => this.done = this.confirmFormGroup.controls.credixCode.valid))
      .subscribe(result => {
        this.title = result.title;
        this.status = result.type;
        this.message = result.message;
      });
  }

  getTags(tags: Tag[]) {
    this.titleTag = tags.find(tag => tag.description === 'adicionales.title')?.value;
    this.firstStepperTag = tags.find(tag => tag.description === 'adicionales.stepper1')?.value;
    this.secondStepperTag = tags.find(tag => tag.description === 'adicionales.stepper2')?.value;
    this.thirdStepperTag = tags.find(tag => tag.description === 'adicionales.stepper3')?.value;
  }
}
