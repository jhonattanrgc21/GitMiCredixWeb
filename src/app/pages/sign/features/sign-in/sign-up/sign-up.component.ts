import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalService} from '../../../../../core/services/modal.service';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {IdentificationType} from 'src/app/shared/models/identification-type';
import {finalize, takeUntil} from 'rxjs/operators';
import {CredixToastService} from 'src/app/core/services/credix-toast.service';
import {CdkStepper} from '@angular/cdk/stepper';
import {getIdentificationMaskByType} from '../../../../../shared/utils';
import {GlobalApiService} from '../../../../../core/services/global-api.service';
import {SignUpService} from './sign-up.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  identificationTypes: IdentificationType[];
  phoneNumber: string;
  mail: string;
  identificationMask = '0-0000-0000';
  hidePassword = true;
  hideConfirmPassword = true;
  userId: number;
  otpSent = false;
  phoneLabel: string;
  mailLabel: string;
  newUserFirstStepForm: FormGroup = new FormGroup({
    typeIdentification: new FormControl(null, [Validators.required]),
    identification: new FormControl({value: null, disabled: true}, [Validators.required])
  });
  newUserSecondStepForm: FormGroup = new FormGroup({
    credixCode: new FormControl('', [Validators.required])
  });
  selectOptionToSendOTP: FormControl = new FormControl(null, [Validators.required]);
  newUserThirdStepForm: FormGroup = new FormGroup({
    newPassword: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required])
  }, {validators: this.checkPasswords});
  errorMessage = '';
  unsubscribe = new Subject();
  @ViewChild('stepper') stepper: CdkStepper;

  constructor(private signUpService: SignUpService,
              private modalService: ModalService,
              private globalApiService: GlobalApiService,
              private toastService: CredixToastService,
              private dialogRef: MatDialogRef<SignUpComponent>) {
  }

  ngOnInit(): void {
    this.getIdentificationTypes();
  }

  getIdentificationTypes() {
    this.globalApiService.getIdentificationTypes()
      .pipe(finalize(() => this.identificationChanged()))
      .subscribe(identificationTypes => this.identificationTypes = identificationTypes.filter(idt => idt.id > 0));
  }

  back() {
    this.stepper.previous();
  }

  nextStep() {
    this.stepper.next();
  }

  informationUser() {
    this.signUpService.getInformationClient(this.newUserFirstStepForm.controls.identification.value, true)
      .pipe(finalize(() => this.verifyRegistryUser()))
      .subscribe(response => {
        this.phoneNumber = response.phone;
        this.mail = response.email;
        this.phoneLabel = `SMS: ${this.phoneNumber}`;
        this.mailLabel = `Correo: ${this.mail}`;

        console.log(response);
      });
  }


  verifyRegistryUser() {
    this.signUpService.checkUser(this.newUserFirstStepForm.controls.identification.value)
      .subscribe(response => {
        if (response.status === 'success') {
          this.nextStep();
          /*    if (!response.isRegistered) {
                this.nextStep();
                this.sendOtp();
              } else {
                this.dialogRef.close();
                this.modalService.open({component: ForgotPasswordComponent, title: '¿Olvidó su clave?'},
                  {width: 376, height: 663, disableClose: true});
              }*/
        }
      }, error => {
        this.errorMessage = error.message;
        this.newUserFirstStepForm.controls.identification.setErrors({invalid: true});
        this.newUserFirstStepForm.updateValueAndValidity();
        this.checkChanges();
      });
  }

  sendOtp() {
    this.signUpService.sendOtp(
      this.otpSent,
      this.newUserFirstStepForm.controls.identification.value,
      this.newUserFirstStepForm.controls.typeIdentification.value,
      this.selectOptionToSendOTP.value).subscribe(user => {
      if (user) {
        this.nextStep();
        this.userId = user.userId;
        this.otpSent = true;
      } else {
        this.dialogRef.close();
      }
    });
  }

  validateOtp() {
    this.signUpService.validateOtp(this.newUserSecondStepForm.controls.credixCode.value, this.userId).subscribe(response => {
      if (response.status === 'success') {
        this.nextStep();
      } else {
        this.newUserSecondStepForm.controls.credixCode.setErrors({invalid: true});
        this.newUserSecondStepForm.updateValueAndValidity();
      }
    });
  }

  submit() {
    this.signUpService.checkPassword(this.userId, this.newUserThirdStepForm.controls.newPassword.value)
      .subscribe(response => {
        if (response.type === 'success') {
          this.dialogRef.close({
            identification: this.newUserFirstStepForm.controls.identification.value,
            password: this.newUserThirdStepForm.controls.newPassword.value
          });
        }
      });
  }

  identificationChanged() {
    let maxLength: number;
    this.newUserFirstStepForm.controls.typeIdentification.valueChanges.subscribe(value => {
      if (value !== null) {
        this.identificationMask = getIdentificationMaskByType(
          this.identificationTypes.find(identificationType => identificationType.id === value).value).mask;
        maxLength = getIdentificationMaskByType(
          this.identificationTypes.find(identificationType => identificationType.id === value).value).maxLength;
        this.newUserFirstStepForm.controls.identification.setValidators([Validators.minLength(maxLength)]);
        this.newUserFirstStepForm.controls.identification.updateValueAndValidity();
        this.newUserFirstStepForm.controls.identification.reset(null, {emitEvent: false});
        this.newUserFirstStepForm.controls.identification.enable();
      } else {
        this.newUserFirstStepForm.controls.identification.disable();
      }
    });
  }

  onChangeSelectOtpToSend(event) {
    console.log(event);
    if (event.checked) {
      this.selectOptionToSendOTP.patchValue(event.value);
    }
  }

  checkPasswords(group: FormGroup): ValidationErrors | null {
    const password: string = group.get('newPassword').value || '';
    const repeatedPassword = group.get('confirmPassword').value || '';

    if (!password || !repeatedPassword) {
      return null;
    }
    return password === repeatedPassword ? null : {mismatch: true};
  }

  checkChanges() {
    this.newUserFirstStepForm.controls.identification.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(value => {
        if (this.newUserFirstStepForm.controls.identification.errors?.invalid) {
          this.newUserFirstStepForm.controls.identification.setErrors(null);
          this.newUserFirstStepForm.updateValueAndValidity();
          this.unsubscribe.next();
          this.unsubscribe.complete();
        }
      });
  }

  ngOnDestroy(): void {
    this.signUpService.unsubscribe();
  }
}
