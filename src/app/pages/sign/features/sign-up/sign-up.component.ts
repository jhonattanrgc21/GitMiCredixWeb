import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ModalService} from '../../../../core/services/modal.service';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {IdentificationType} from 'src/app/shared/models/IdentificationType';
import {HttpService} from 'src/app/core/services/http.service';
import {finalize} from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import {CredixToastService} from 'src/app/core/services/credix-toast.service';
import {CdkStepper} from '@angular/cdk/stepper';
import {getIdentificationMaskByType} from '../../../../shared/utils';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  identificationTypes: IdentificationType[];
  cellNumber: string;
  identificationMask = '0-0000-0000';
  hideNewPassword = true;
  hideConfirmPassword = true;
  userId: number;
  responseResult = {
    message: '',
    title: '',
    status: ''
  };
  resultPopup: MatDialogRef<any>;

  newUserFirstStepForm: FormGroup = new FormGroup({
    typeIdentification: new FormControl('', [Validators.required]),
    identification: new FormControl({value: '', disabled: true}, [Validators.required])
  });

  newUserSecondStepForm: FormGroup = new FormGroup(
    {credixCode: new FormControl('', [Validators.required])});

  newUserThirdStepForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  }, {validators: this.checkPasswords});

  @ViewChild('templateModalSignUp') templateModalSignUp: TemplateRef<any>;
  @ViewChild('popupResults') popupResults: TemplateRef<any>;
  @ViewChild('stepper') stepper: CdkStepper;

  constructor(
    private modalService: ModalService,
    private httpService: HttpService,
    private toastService: CredixToastService) {
  }

  get fFirstControls() {
    return this.newUserFirstStepForm.controls;
  }

  get fSecondControl() {
    return this.newUserSecondStepForm.controls;
  }

  get fThirstyControls() {
    return this.newUserThirdStepForm.controls;
  }

  get userIdValues() {
    return this.userId;
  }

  ngOnInit(): void {
    this.getIdentificationTypes();
  }

  public setUserIdValue(id: number) {
    this.userId = id;
  }

  getIdentificationTypes() {
    this.httpService.post('canales', 'global/identification-types', {channelId: 102})
      .pipe(finalize(() => this.identificationChanged()))
      .subscribe(response => this.identificationTypes = response.identificationTypes.filter(idt => idt.id > 0));
  }

  showToast(type, text: string) {
    this.toastService.show({text, type});
  }

  nextStep() {
    this.stepper.selectedIndex = this.stepper.selectedIndex + 1;
    this.stepper.next();
  }

  showPopupResult() {
    this.resultPopup = this.modalService.open({template: this.popupResults}, {width: 376, height: 349, disableClose: false});
  }

  identificationChanged() {
    this.fFirstControls.typeIdentification.valueChanges.subscribe(value => {

      if (value !== null) {
        this.identificationMask = getIdentificationMaskByType(
          this.identificationTypes.find(identificationType => identificationType.id === value).value).mask;
        this.fFirstControls.identification.reset(null, {emitEvent: false});
        this.fFirstControls.identification.enable();
      } else {
        this.fFirstControls.identification.disable();
      }
    });
  }

  checkPasswords(group: FormGroup): ValidationErrors | null {
    const password: string = group.get('newPassword').value || '';
    const repeatedPassword = group.get('confirmPassword').value || '';

    if (!password || !repeatedPassword) {
      return null;
    }
    return password === repeatedPassword ? null : {mismatch: true};
  }

  verifyRegistryUser() {
    this.httpService.post('canales', 'security/verifyregistryuser', {
      identification: this.fFirstControls.identification.value,
      channelId: 101
    })
      .pipe(finalize(() => this.sendIdentification()))
      .subscribe(response => {
        console.log(response);
      });
  }

  sendIdentification() {
    this.httpService.post('canales', 'security/getdatamaskednameapplicantsendotp', {
      channelId: 1,
      typeIdentification: this.fFirstControls.typeIdentification.value,
      identification: this.fFirstControls.identification.value
    })
      .subscribe(response => {
        this.cellNumber = response.phone;
        this.setUserIdValue(response.userId);
        this.showToast(response.type, response.message);
        if (response.type === 'success') {
          this.nextStep();
        }
      });
  }

  getCodeAgain() {
    this.sendIdentification();
  }


  sendPasswordSecurity() {
    this.httpService.post('canales', 'security/validateonetimepassword',
      {
        channelId: 102,
        userId: this.userIdValues,
        validateToken: 1,
        usernameSecurity: 'sts_sac',
        passwordSecurity: '27ddddd7aa59f8c80837e6f46e79d5d5c05a4068914babbbf7745b43a2b21f47',
        confirmationCode: this.fSecondControl.credixCode.value
      })
      .subscribe(response => {
        console.log(response);
        this.responseResult.message = response.message;
        this.responseResult.title = response.titleOne;
        this.responseResult.status = response.type;
        if (response.type === 'success') {
          this.nextStep();
        }
      });
  }

  submit() {
    this.httpService.post('canales', 'security/validatePasswordAndConfirmPassword', {
      userId: this.userIdValues,
      channelId: 102,
      typeIncome: 1,
      validateToken: 1,
      newPassword: CryptoJS.SHA256(this.fThirstyControls.newPassword.value),
      confirmPassword: CryptoJS.SHA256(this.fThirstyControls.confirmPassword.value),
      usernameSecurity: 'sts_sac',
      passwordSecurity: '27ddddd7aa59f8c80837e6f46e79d5d5c05a4068914babbbf7745b43a2b21f47',
      uuid: '12311515615614515616',
      platform: 3
    })
      .pipe(finalize(() => this.showPopupResult()))
      .subscribe(response => {
        this.responseResult.message = response.message;
        this.responseResult.title = response.titleOne;
        this.responseResult.status = response.type;
      });
  }
}
