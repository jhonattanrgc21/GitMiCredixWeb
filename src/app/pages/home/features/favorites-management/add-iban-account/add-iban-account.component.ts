import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IdentificationType} from '../../../../../shared/models/IdentificationType';
import {IbanAccountsService} from '../iban-accounts/iban-accounts.service';
import {finalize} from 'rxjs/operators';
import {getIdentificationMaskByType} from '../../../../../shared/utils';
import {ModalService} from '../../../../../core/services/modal.service';

@Component({
  selector: 'app-add-iban-account',
  templateUrl: './add-iban-account.component.html',
  styleUrls: ['./add-iban-account.component.scss']
})
export class AddIbanAccountComponent implements OnInit {

  identificationTypes: IdentificationType[];
  identificationMask = '0-0000-0000';
  resultIban: boolean;
  result: { status: string; message: string; title: string; };
  newFavoriteIbanForm: FormGroup = new FormGroup({
    ibanAccount: new FormControl('', [Validators.required]),
    nameOfFavorite: new FormControl('', [Validators.required]),
    identificationType: new FormControl(null),
    identification: new FormControl(null)
  });

  codeCredix: FormControl = new FormControl(null, [Validators.required]);

  // tslint:disable-next-line:no-output-rename
  @Output('backToTemplate') backToTemplate: EventEmitter<string> = new EventEmitter<string>();

  constructor(private ibanAccountService: IbanAccountsService,
              private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.resultIban = false;
    this.identificationType();
  }

  identificationType() {
    this.ibanAccountService.getIdentificationTypes()
      .pipe(finalize(() => this.identificationChanged()))
      .subscribe(response => {
        this.identificationTypes = response.filter(idt => idt.id > 0);
      });
  }

  identificationChanged() {
    this.newFavoriteIbanForm.controls.identificationType.valueChanges.subscribe(value => {
      if (value !== null) {
        this.identificationMask = getIdentificationMaskByType(
          this.identificationTypes.find(identificationType => identificationType.id === value).value).mask;
        this.newFavoriteIbanForm.controls.identification.reset(null, {emitEvent: false});
        this.newFavoriteIbanForm.controls.identification.enable();
      } else {
        this.newFavoriteIbanForm.controls.identification.disable();
      }
    });
  }

  back() {
    this.backToTemplate.emit('favorite-management');
  }

  ready() {
    this.backToTemplate.emit('favorite-management');
    if (this.result.status === 'success') {
      this.ibanAccountService.emitIbanIsAdd(true);
    }
  }

  addIbanFavoriteAccount() {
    this.modalService.confirmationPopup('¿Desea añadir esta cuenta IBAN?', '', 380, 203).subscribe((confirm) => {
      if (confirm) {
        // tslint:disable-next-line:max-line-length
        this.ibanAccountService.setIbanFavoriteAccount(this.newFavoriteIbanForm.controls.nameOfFavorite.value, this.newFavoriteIbanForm.controls.ibanAccount.value, this.newFavoriteIbanForm.controls.identificationType.value, this.newFavoriteIbanForm.controls.identification.value, this.codeCredix.value)
          .subscribe((response) => {
            this.resultIban = !this.resultIban;
            this.result = {
              status: response.type,
              message: response.message,
              title: response.titleOne
            };
          });
      } else {
        return false;
      }
    });
  }

}
