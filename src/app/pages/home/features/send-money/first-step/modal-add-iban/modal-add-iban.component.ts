import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import {HttpService} from 'src/app/core/services/http.service';
import {IdentificationType} from '../../../../../../shared/models/IdentificationType';
import {getIdentificationMaskByType} from '../../../../../../shared/utils';

@Component({
  selector: 'app-modal-add-iban',
  templateUrl: './modal-add-iban.component.html',
  styleUrls: ['./modal-add-iban.component.scss']
})
export class ModalAddIbanComponent implements OnInit {
  identificationTypes: IdentificationType[];
  identificationMask = '0-0000-0000';

  newAccountForm: FormGroup = new FormGroup(
    {
      ibanAccount: new FormControl('', [Validators.required]),
      identType: new FormControl('', [Validators.required]),
      identNumber: new FormControl({value: '', disabled: true}, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      favName: new FormControl(''),
    }
  );

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getIdentificationTypes();
  }


  submit() {
    if (this.newAccountForm.valid) {
      this.httpService
        .post(
          'canales',
          'iban/saveFavoriteAccountIBAN',
          {
            aliasName : this.newAccountForm.controls.name.value,
            ibanAccount : this.newAccountForm.controls.ibanAccount.value,
            typeIdentificacionId : this.newAccountForm.controls.identType.value,
            identification: this.newAccountForm.controls.identNumber.value,
            codeCredix : "1213",
            channelId : 102
        }
        )
        .subscribe((res) => {

        });
    }
  }

  getIdentificationTypes() {
    this.httpService
      .post('canales', 'global/identification-types', {
        channelId: 102,
      })
      .pipe(finalize(() => this.identificationTypeChanged()))
      .subscribe(
        (response) => this.identificationTypes = response.identificationTypes.filter((idt) => idt.id > 0)
      );
  }

  identificationTypeChanged() {
    this.newAccountForm.controls.identType.valueChanges.subscribe((value) => {
      if (value !== null) {
        this.identificationMask = getIdentificationMaskByType(
          this.identificationTypes.find(identificationType => identificationType.id === value).value).mask;
        this.newAccountForm.controls.identNumber.reset(null, {emitEvent: false});
        this.newAccountForm.controls.identNumber.enable();
      } else {
        this.newAccountForm.controls.identNumber.disable();
      }
    });
  }

}










