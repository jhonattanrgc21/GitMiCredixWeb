import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { GlobalApiService } from 'src/app/core/services/global-api.service';
import { IdentificationType } from '../../../../../shared/models/identification-type';
import { ModalService } from '../../../../../core/services/modal.service';
import { CivilStatus } from 'src/app/shared/models/civil-status';

@Component({
  selector: 'personal-info-step-component',
  templateUrl: './personal-info-step.component.html',
  styleUrls: ['./personal-info-step.component.scss']
})
export class PersonalInfoStepComponent implements OnInit {
  @Input() personalInfoFormGroup: FormGroup;

  @ViewChild('changeCelphonePopUp') changeCelphonePopUp: TemplateRef<any>

  identificationTypes: IdentificationType[]
  civilStatuses: CivilStatus[]
  genders: any[]

  formControl = new FormControl('test')
  formControl2 = new FormControl(12345678)

  constructor(private globalApiService: GlobalApiService, private modalService: ModalService) { }

  ngOnInit(): void {

    this.globalApiService.getIdentificationTypes()
      .subscribe(identificationTypes =>
        this.identificationTypes = identificationTypes.filter((idt) => idt.id > 0));
    this.globalApiService.getCivilStatuses()
      .subscribe(civilStatuses => {
        this.civilStatuses = civilStatuses
      })

    this.genders = [
      {
        id: "F",
        description: "Femenino"
      },
      {
        id: "M",
        description: "Masculino"
      }
    ]
  }

  openCelphonePopUp() {
    this.modalService.open({
      template: this.changeCelphonePopUp,
      title: null,
    }, { width: 343, disableClose: false, panelClass: 'change-celphone-popup' })
  }

  openPhoneCall() {
    window.location.href = 'tel:+50622273349'
  }

  goToLocationsWebsite() {
    window.open('https://www.credix.com/sucursales/', '_blank')
  }
}
