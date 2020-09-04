import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IdentificationType} from '../../../../../../shared/models/IdentificationType';
import {getIdentificationMaskByType} from '../../../../../../shared/utils';
import {ModalService} from '../../../../../../core/services/modal.service';
import {GlobalRequestsService} from '../../../../../../core/services/global-requests.service';
import {finalize} from 'rxjs/operators';
import {AdditionalCardsManagementService} from '../../additional-cards-management.service';

@Component({
  selector: 'app-new-additional-card-first-step',
  templateUrl: './new-additional-card-first-step.component.html',
  styleUrls: ['./new-additional-card-first-step.component.scss']
})
export class NewAdditionalCardFirstStepComponent implements OnInit, OnChanges {
  @Input() userInfoFormGroup: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    identificationType: new FormControl(null, [Validators.required]),
    identification: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    birthday: new FormControl(null, [Validators.required]),
    creditLimit: new FormControl(null, [Validators.required])
  });
  identificationTypes: IdentificationType[];
  identificationMask = '0-0000-0000';

  constructor(private additionalCardsManagementService: AdditionalCardsManagementService,
              private modalService: ModalService,
              private globalRequestsService: GlobalRequestsService) {
  }

  ngOnInit(): void {
    this.onFormChanged();
    this.globalRequestsService.getIdentificationTypes()
      .pipe(finalize(() => this.identificationTypeChanged()))
      .subscribe(identificationTypes => this.identificationTypes = identificationTypes);
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.userInfoFormGroup.firstChange) {
      this.userInfoFormGroup.controls.creditLimit.setValue(25);
    }
  }

  identificationTypeChanged() {
    this.userInfoFormGroup.controls.identificationType.valueChanges.subscribe((value) => {
      if (value !== null) {
        this.identificationMask = getIdentificationMaskByType(
          this.identificationTypes.find(identificationType => identificationType.id === value).value).mask;
        this.userInfoFormGroup.controls.identification.reset(null, {emitEvent: false});
        this.userInfoFormGroup.controls.identification.enable();
      } else {
        this.userInfoFormGroup.controls.identification.disable();
      }
    });
  }

  openCalendar() {
    this.modalService.calendarPopup().subscribe(modal => {
      if (modal) {
        this.userInfoFormGroup.controls.birthday.setValue(modal.date);
      }
    });
  }

  sliderChanged(value) {
    this.userInfoFormGroup.controls.creditLimit.setValue(value);
  }

  onFormChanged() {
    this.userInfoFormGroup.valueChanges.subscribe(value => {
      if (this.userInfoFormGroup.valid) {
        this.additionalCardsManagementService.personalInfo = value;
      }
    });
  }
}
