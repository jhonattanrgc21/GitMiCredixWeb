import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import {ModalService} from 'src/app/core/services/modal.service';
import {HttpService} from 'src/app/core/services/http.service';
import {IdentificationType} from '../../../../shared/models/identification-type';
import {getIdentificationMaskByType} from '../../../../shared/utils';
import {GlobalApiService} from '../../../../core/services/global-api.service';
import {CredixToastService} from '../../../../core/services/credix-toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild('forgotPasswordTemplate') forgotPasswordTemplate: TemplateRef<any>;
  identificationTypes: IdentificationType[];
  hide = true;
  type = 'password';
  identificationMask = '0-0000-0000';
  forgotPassForm: FormGroup = new FormGroup(
    {
      identType: new FormControl(null, [Validators.required]),
      identNumber: new FormControl({value: null, disabled: true}, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
      code: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    },
    {validators: this.passwordValidator}
  );

  constructor(
    private modalService: ModalService,
    private httpService: HttpService,
    private globalApiService: GlobalApiService,
    private toastService: CredixToastService) {
  }

  get f() {
    return this.forgotPassForm.controls;
  }

  ngOnInit(): void {
    this.getIdentificationTypes();
  }

  getIdentificationTypes() {
    this.globalApiService.getIdentificationTypes()
      .pipe(finalize(() => this.identificationTypeChanged()))
      .subscribe(identificationTypes =>
        this.identificationTypes = identificationTypes.filter((idt) => idt.id > 0));
  }

  submit() {
    if (this.forgotPassForm.valid) {
      this.httpService
        .post(
          'canales',
          'security/user/forgetusernameandpasswordbyidentification',
          {
            codeCredix: this.forgotPassForm.controls.code.value,
            typeIdentification: this.forgotPassForm.controls.identType.value,
            identification: this.forgotPassForm.controls.identNumber.value,
            password: CryptoJS.SHA256(this.forgotPassForm.get('password').value).toString(),
            passwordConfirmation: CryptoJS.SHA256(this.forgotPassForm.get('confirmPassword').value).toString(),
          }).subscribe(response => {
        this.toastService.show({type: response.type, text: response.descriptionOne});
      });
    }
  }

  identificationTypeChanged() {
    this.forgotPassForm.controls.identType.valueChanges.subscribe((value) => {
      if (value !== null) {
        this.identificationMask = getIdentificationMaskByType(
          this.identificationTypes.find(identificationType => identificationType.id === value).value).mask;
        this.forgotPassForm.controls.identNumber.reset(null, {emitEvent: false});
        this.forgotPassForm.controls.identNumber.enable();
      } else {
        this.forgotPassForm.controls.identNumber.disable();
      }
    });
  }

  passwordValidator(control: FormGroup): ValidationErrors | null {
    const password = control.get('password');
    const repeatPassword = control.get('confirmPassword');
    if (repeatPassword.errors && !repeatPassword.errors.passwordError) {
      return;
    }
    if (password.value !== repeatPassword.value) {
      repeatPassword.setErrors({passwordError: true});
    } else {
      repeatPassword.setErrors(null);
    }
  }

}
