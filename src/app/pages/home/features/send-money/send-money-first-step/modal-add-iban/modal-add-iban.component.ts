import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {IdentificationType} from '../../../../../../shared/models/identification-type';
import {getIdentificationMaskByType} from '../../../../../../shared/utils';
import {SendMoneyService} from '../../send-money.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CredixToastService} from '../../../../../../core/services/credix-toast.service';
import {GlobalApiService} from '../../../../../../core/services/global-api.service';

@Component({
  selector: 'app-modal-add-iban',
  templateUrl: './modal-add-iban.component.html',
  styleUrls: ['./modal-add-iban.component.scss'],
})
export class ModalAddIbanComponent implements OnInit {
  identificationTypes: IdentificationType[];
  identificationMask = '0-0000-0000';
  errorDescription: string;
  showFavorite = this.data.data.info ? this.data.data.info.showFav : false;
  isChecked = this.data.data.info ? this.data.data.info.showFav : false;
  newAccountForm: FormGroup = new FormGroup({
    ibanAccount: new FormControl(
      this.data.data.info ? this.data.data.info.ibanAccount : null,
      [Validators.required, Validators.minLength(22), Validators.maxLength(22)]
    ),
    identificationType: new FormControl(
      this.data.data.info ? this.data.data.info.identificationType : null,
      [Validators.required]
    ),
    identification: new FormControl(
      {
        value: this.data.data.info ? this.data.data.info.identification : null,
        disabled: !this.data.data.info,
      },
      [Validators.required, Validators.minLength(9)]
    ),
    favName: new FormControl(
      this.data.data.info ? this.data.data.info.favName : null,
      this.showFavorite && [Validators.required]
    ),
  });
  newAccount: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<ModalAddIbanComponent>,
              private globalApiService: GlobalApiService,
              public toastService: CredixToastService,
              private sendMoneyService: SendMoneyService) {
  }

  ngOnInit(): void {
    this.getIdentificationTypes();
    this.onChanges();
  }

  onChanges(): void {
    this.newAccountForm.valueChanges.subscribe((value) => {

      console.log("value: ", value);
      if (value.ibanAccount && value.identificationType && value.identification && !value.favName) {
        if (value.ibanAccount.length === 22 && value.identification.length === 9) {
          this.sendMoneyService
            .getAccountByIbanNumber(value.identification, value.ibanAccount, this.data.data.currency === '$' ? 'D' : 'L')
            .subscribe((res) => {
              if (res.type === 'success') {
                this.newAccount = res;
              } else {
                this.newAccountForm.controls.ibanAccount.setErrors({invalid: true});
                this.errorDescription = res.descriptionOne;
              }
            });
        }
      }
    });
  }

  getIdentificationTypes() {
    this.globalApiService.getIdentificationTypes()
      .pipe(finalize(() => this.identificationTypeChanged()))
      .subscribe(identificationTypes => this.identificationTypes = identificationTypes);
  }

  identificationTypeChanged() {
    this.newAccountForm.controls.identificationType.valueChanges.subscribe((value) => {
      if (value !== null) {
        this.identificationMask = getIdentificationMaskByType(
          this.identificationTypes.find((identificationType) => identificationType.id === value).value).mask;
        this.newAccountForm.controls.identification.reset(null, {
          emitEvent: false,
        });
        this.newAccountForm.controls.identification.enable();
      } else {
        this.newAccountForm.controls.identification.disable();
      }
    });
  }

  onCheckboxChanged(event) {
    this.showFavorite = event.checked;
  }

  submit() {
    if (this.newAccountForm.valid) {
      this.dialogRef.close({
        aliasName: !this.data.data.info ? this.newAccount.message.Nombre : this.data.data.info.aliasName,
        ibanAccount: this.newAccountForm.controls.ibanAccount.value,
        identification: this.newAccountForm.controls.identification.value,
        identificationType: this.newAccountForm.controls.identificationType.value,
        favName: this.newAccountForm.controls.favName.value,
        ibanBank: this.newAccount ? this.newAccount.ibanBank : this.data.data.info.ibanBank,
        showFav: this.showFavorite,
      });
    }
  }
}
