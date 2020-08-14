import { Component, OnInit, Inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { finalize } from "rxjs/operators";
import { HttpService } from "src/app/core/services/http.service";
import { IdentificationType } from "../../../../../../shared/models/IdentificationType";
import { getIdentificationMaskByType } from "../../../../../../shared/utils";
import { ModalService } from "../../../../../../core/services/modal.service";
import {SendMoneyService} from '../../send-money.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: "app-modal-add-iban",
  templateUrl: "./modal-add-iban.component.html",
  styleUrls: ["./modal-add-iban.component.scss"],
})
export class ModalAddIbanComponent implements OnInit {
  identificationTypes: IdentificationType[];
  identificationMask = "0-0000-0000";
  showFavorite = false;
  isChecked = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data,private httpService: HttpService, private modalService: ModalService, private sendMoney: SendMoneyService) {}

  newAccountForm: FormGroup = new FormGroup({
    ibanAccount: new FormControl(this.data.data.info ? this.data.data.info.ibanAccount : "", [Validators.required]),
    identType: new FormControl(this.data.data.info ? this.data.data.info.identType : "", [Validators.required]),
    identNumber: new FormControl({ value: this.data.data.info ? this.data.data.info.identification : "", disabled: !this.data.data.info }, [
      Validators.required,
    ]),
    name: new FormControl(this.data.data.info ? this.data.data.info.aliasName : "", [Validators.required]),
    favName: new FormControl(this.data.data.info ? this.data.data.info.favName : ""),
  });

  ngOnInit(): void {
    this.getIdentificationTypes();
  }

  submit() {
   if (this.newAccountForm.valid) {
    const aliasName= this.newAccountForm.controls.name.value;
    const ibanAccount= this.newAccountForm.controls.ibanAccount.value;
    const identification= this.newAccountForm.controls.identNumber.value;
    const identType= this.newAccountForm.controls.identType.value;
    const favName= this.newAccountForm.controls.favName.value;
    const ibanBank= 'Banco Nacional';
    this.sendMoney.addFavAccount(aliasName, ibanAccount, identType, identification, '1213');
    this.modalService.addAccountChange.emit({
      aliasName: aliasName,
      ibanAccount: ibanAccount,
      identification: identification,
      identType: identType,
      favName: favName,
      ibanBank: ibanBank
    });
    }

  }

  getIdentificationTypes() {
    this.httpService
      .post("canales", "global/identification-types", {
        channelId: 102,
      })
      .pipe(finalize(() => this.identificationTypeChanged()))
      .subscribe(
        (response) =>
          (this.identificationTypes = response.identificationTypes.filter(
            (idt) => idt.id > 0
          ))
      );
  }

  identificationTypeChanged() {
    this.newAccountForm.controls.identType.valueChanges.subscribe((value) => {
      if (value !== null) {
        this.identificationMask = getIdentificationMaskByType(
          this.identificationTypes.find(
            (identificationType) => identificationType.id === value
          ).value
        ).mask;
        this.newAccountForm.controls.identNumber.reset(null, {
          emitEvent: false,
        });
        this.newAccountForm.controls.identNumber.enable();
      } else {
        this.newAccountForm.controls.identNumber.disable();
      }
    });
  }

  emit(event: { value: string; checked: boolean }) {
    event.checked ? (this.showFavorite = true) : (this.showFavorite = false);
  }
}
