import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {HttpService} from 'src/app/core/services/http.service';
import {IdentificationType} from '../../../../../../shared/models/IdentificationType';
import {getIdentificationMaskByType} from '../../../../../../shared/utils';
import {ModalService} from '../../../../../../core/services/modal.service';
import {SendMoneyService} from '../../send-money.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CredixToastService} from '../../../../../../core/services/credix-toast.service';
import {GlobalRequestsService} from '../../../../../../core/services/global-requests.service';

@Component({
  selector: 'app-modal-add-iban',
  templateUrl: './modal-add-iban.component.html',
  styleUrls: ['./modal-add-iban.component.scss'],
})
export class ModalAddIbanComponent implements OnInit {
  identificationTypes: IdentificationType[];
  identificationMask = '0-0000-0000';
  showFavorite = false;
  isChecked = false;
  newAccountForm: FormGroup = new FormGroup({
    ibanAccount: new FormControl(this.data.data.info ? this.data.data.info.ibanAccount : null, [Validators.required]),
    identType: new FormControl(this.data.data.info ? this.data.data.info.identType : null, [Validators.required]),
    identNumber: new FormControl({
      value: this.data.data.info ? this.data.data.info.identification : null,
      disabled: !this.data.data.info
    }, [Validators.required]),
    favName: new FormControl(this.data.data.info ? this.data.data.info.favName : null,
      this.showFavorite && [Validators.required]),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private httpService: HttpService,
              private globalRequestsService: GlobalRequestsService,
              private modalService: ModalService,
              private sendMoney: SendMoneyService,
              public toastService: CredixToastService,
              public dialogRef: MatDialogRef<ModalAddIbanComponent>,
              private sendMoneyService: SendMoneyService) {
  }

  ngOnInit(): void {
    this.getIdentificationTypes();
    this.onChanges();
  }

  onChanges(): void {
    this.newAccountForm.valueChanges.subscribe(val => {
      if(val.ibanAccount && val.identType && val.identNumber){
        if(val.ibanAccount.length === 22 && val.identNumber.length === 9){
          console.log('listo');
          this.sendMoneyService.getAccountByIbanNumber(val.identNumber, val.ibanAccount).subscribe((res) => {
            if (res.type === 'success') {
              //this.ibanOrigin = res.ibanAccountList[0].ibanAccountNumber;
            }
          });
        }
      }
    });
  }

  getIdentificationTypes() {
    this.globalRequestsService.getIdentificationTypes()
      .pipe(finalize(() => this.identificationTypeChanged()))
      .subscribe(identificationTypes => this.identificationTypes = identificationTypes);
  }

  identificationTypeChanged() {
    this.newAccountForm.controls.identType.valueChanges.subscribe((value) => {
      if (value !== null) {
        this.identificationMask = getIdentificationMaskByType(
          this.identificationTypes.find((identificationType) => identificationType.id === value).value).mask;
        this.newAccountForm.controls.identNumber.reset(null, {emitEvent: false,});
        this.newAccountForm.controls.identNumber.enable();
      } else {
        this.newAccountForm.controls.identNumber.disable();
      }
    });
  }

  onCheckboxChanged(event) {
    this.showFavorite = event.checked;
  }

  submit() {
    if (this.newAccountForm.valid) {

      this.dialogRef.close({
        aliasName: this.newAccountForm.controls.name.value,
        ibanAccount: this.newAccountForm.controls.ibanAccount.value,
        identification: this.newAccountForm.controls.identNumber.value,
        identType: this.newAccountForm.controls.identType.value,
        favName: this.newAccountForm.controls.favName.value,
        ibanBank: 'Banco Nacional',
      });
    }
  }

}
