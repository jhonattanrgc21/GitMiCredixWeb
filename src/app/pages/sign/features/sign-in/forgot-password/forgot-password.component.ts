import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {ForgotPasswordService} from './forgot-password.service';
import {CredixCodeErrorService} from '../../../../../core/services/credix-code-error.service';
import {getIdentificationMaskByType} from '../../../../../shared/utils';
import {IdentificationType} from '../../../../../shared/models/identification-type';
import {GlobalApiService} from '../../../../../core/services/global-api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup = new FormGroup(
    {
      identificationType: new FormControl(null, [Validators.required]),
      identification: new FormControl({value: null, disabled: true}, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
      credixCode: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    },
    {validators: this.passwordValidator}
  );
  identificationTypes: IdentificationType[];
  hide = true;
  type = 'password';
  identificationMask = '0-0000-0000';

  constructor(private forgotPasswordService: ForgotPasswordService,
              private credixCodeErrorService: CredixCodeErrorService,
              private globalApiService: GlobalApiService) {
  }

  ngOnInit(): void {
    this.getIdentificationTypes();
    this.credixCodeErrorService.credixCodeError$.subscribe(() => {
      this.forgotPasswordForm.controls.credixCode.setErrors({invalid: true});
      this.forgotPasswordForm.updateValueAndValidity();
    });
  }

  getIdentificationTypes() {
    this.globalApiService.getIdentificationTypes()
      .pipe(finalize(() => this.identificationTypeChanged()))
      .subscribe(identificationTypes =>
        this.identificationTypes = identificationTypes.filter((idt) => idt.id > 0));
  }

  submit() {
    this.forgotPasswordService.changePassword(
      this.forgotPasswordForm.controls.credixCode.value,
      this.forgotPasswordForm.controls.identificationType.value,
      this.forgotPasswordForm.controls.identification.value,
      this.forgotPasswordForm.controls.password.value).subscribe();
  }

  identificationTypeChanged() {
    this.forgotPasswordForm.controls.identificationType.valueChanges.subscribe((value) => {
      if (value !== null) {
        this.identificationMask = getIdentificationMaskByType(
          this.identificationTypes.find(identificationType => identificationType.id === value).value).mask;
        this.forgotPasswordForm.controls.identification.reset(null, {emitEvent: false});
        this.forgotPasswordForm.controls.identification.enable();
      } else {
        this.forgotPasswordForm.controls.identification.disable();
      }
    });
  }

  passwordValidator(control: FormGroup): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (confirmPassword.errors && !confirmPassword.errors.passwordError) {
      return;
    }
    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({passwordError: true});
    } else {
      confirmPassword.setErrors(null);
    }
  }

}
