import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IdentificationType} from '../../../../../shared/models/identification-type';
import {IbanAccountsService} from '../iban-accounts/iban-accounts.service';
import {finalize} from 'rxjs/operators';
import {getIdentificationMaskByType} from '../../../../../shared/utils';
import {ModalService} from '../../../../../core/services/modal.service';
import {Router} from '@angular/router';
import {CredixCodeErrorService} from '../../../../../core/services/credix-code-error.service';
import {FavoritesManagementService} from '../favorites-management.service';

@Component({
  selector: 'app-add-iban-account',
  templateUrl: './add-iban-account.component.html',
  styleUrls: ['./add-iban-account.component.scss']
})
export class AddIbanAccountComponent implements OnInit, OnDestroy {
  identificationTypes: IdentificationType[];
  identificationMask = '0-0000-0000';
  resultIban: boolean;
  done = false;
  result: { status: 'success' | 'error'; message: string; title: string; };
  newFavoriteIbanForm: FormGroup = new FormGroup({
    ibanAccount: new FormControl('', [Validators.required]),
    nameOfFavorite: new FormControl('', [Validators.required]),
    identificationType: new FormControl(null),
    identification: new FormControl(null)
  });
  codeCredix: FormControl = new FormControl(null, [Validators.required]);

  constructor(private ibanAccountService: IbanAccountsService,
              private modalService: ModalService,
              private router: Router,
              private credixCodeErrorService: CredixCodeErrorService,
              private favoritesManagementService: FavoritesManagementService) {
  }

  ngOnInit(): void {
    this.resultIban = false;
    this.identificationType();
    this.getCredixCodeError();
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
    this.router.navigate(['/home/favorites-management/iban-accounts']);
  }

  addIbanFavoriteAccount() {
    this.modalService.confirmationPopup('¿Desea añadir esta cuenta IBAN?').subscribe((confirm) => {
      if (confirm) {
        this.ibanAccountService.setIbanFavoriteAccount(
          this.newFavoriteIbanForm.controls.nameOfFavorite.value,
          this.newFavoriteIbanForm.controls.ibanAccount.value,
          this.newFavoriteIbanForm.controls.identificationType.value,
          this.newFavoriteIbanForm.controls.identification.value,
          this.codeCredix.value)
          .pipe(finalize(() => {
            if (!this.codeCredix.hasError('invalid')) {
              this.done = true;
            }
          }))
          .subscribe((response) => {
            this.result = {
              status: response.type,
              message: response.message,
              title: response.titleOne
            };
          });
      }
    });
  }

  getCredixCodeError() {
    this.credixCodeErrorService.credixCodeError$.subscribe(() => {
      this.codeCredix.setErrors({invalid: true});
      this.newFavoriteIbanForm.updateValueAndValidity();
    });
  }

  ngOnDestroy(): void {
    this.favoritesManagementService.unsubscribe();
  }
}
