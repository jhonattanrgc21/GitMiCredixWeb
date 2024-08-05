import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { GlobalApiService } from 'src/app/core/services/global-api.service';
import { IdentificationType } from '../../../../../shared/models/identification-type';
import { ModalService } from '../../../../../core/services/modal.service';

@Component({
  selector: 'personal-info-step-component',
  templateUrl: './personal-info-step.component.html',
  styleUrls: ['./personal-info-step.component.scss']
})
export class PersonalInfoStepComponent implements OnInit {
  @Input() personalInfoFormGroup: FormGroup;

  @ViewChild('changeCelphonePopUp') changeCelphonePopUp: TemplateRef<any>

  identificationTypes: IdentificationType[]

  formControl = new FormControl('test')
  formControl2 = new FormControl(12345678)

  constructor(private globalApiService: GlobalApiService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.getIdentificationTypes()
  }

  getIdentificationTypes() {
    this.globalApiService.getIdentificationTypes()
      .subscribe(identificationTypes =>
        this.identificationTypes = identificationTypes.filter((idt) => idt.id > 0));
  }

  openCelphonePopUp(){
    this.modalService.open({
      template: this.changeCelphonePopUp,
      title: null,
    }, {width: 343, disableClose: false, panelClass: 'change-celphone-popup'})
  }

  openPhoneCall(){
    window.location.href = 'tel:+1234567890'
  }

  goToLocationsWebsite(){
    window.open('https://www.credix.com/sucursales/', '_blank')
  }
}
