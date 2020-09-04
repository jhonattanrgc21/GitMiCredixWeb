import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IdentificationType} from '../../../../../../shared/models/IdentificationType';
import {IbanAccountsService} from '../iban-accounts.service';
import {finalize} from 'rxjs/operators';
import {getIdentificationMaskByType} from '../../../../../../shared/utils';

@Component({
  selector: 'app-add-iban-account',
  templateUrl: './add-iban-account.component.html',
  styleUrls: ['./add-iban-account.component.scss']
})
export class AddIbanAccountComponent implements OnInit {

  identificationTypes: IdentificationType[];
  identificationMask = '0-0000-0000';

  newFavoriteIbanForm: FormGroup = new FormGroup({
    ibanAccount: new FormControl(null, [Validators.required]),
    nameOfFavorite: new FormControl(null, [Validators.required]),
    identificationType: new FormControl(null),
    identification: new FormControl(null),
    codeCredix: new FormControl(null)
  });

  constructor(private ibanAccountService: IbanAccountsService) {
  }

  ngOnInit(): void {
  }

  identificationType() {
    this.ibanAccountService.getIdentificationTypes()
      .pipe(finalize(() => this.identificationChanged()))
      .subscribe(response => {
        this.identificationTypes = response.identificationTypes.filter(idt => idt.id > 0);
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

}
