import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ModalService} from '../../../../core/services/modal.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {IdentifyTypes} from 'src/app/shared/models/IdentifyModel/IndentifyTypes';
import {HttpService} from 'src/app/core/services/http.service';
import {finalize} from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import {CredixToastService} from 'src/app/core/services/credix-toast.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, AfterViewInit {

  identifyTypes: IdentifyTypes[];
  cellNumber: string;
  identificationMask = '0-0000-0000';
  identificationMaxLength = 0;
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
    identification: new FormControl('', [Validators.required])
  });

  newUserSecondStepForm: FormGroup = new FormGroup(
    {credixCode: new FormControl('', [Validators.required])});

  newUserThirdStepForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  }, {validators: this.checkPasswords});


  @ViewChild('templateModalSignUp') templateModalSignUp: TemplateRef<any>;
  @ViewChild('popupResults') popupResults: TemplateRef<any>;

  constructor(
    private dialog: MatDialog,
    private modalService: ModalService,
    private httpService: HttpService,
    private toastService: CredixToastService) {
  }

  ngOnInit(): void {
    this.getIdentificationTypes();
  }

  get fThirstyControls() {
    return this.newUserThirdStepForm.controls;
  }

  get fFirstControls() {
    return this.newUserFirstStepForm.controls;
  }

  get fSecondControl() {
    return this.newUserSecondStepForm.controls;
  }

  get userIdValues() {
    return this.userId;
  }

  ngAfterViewInit(): void {
    this.openSignUpModal();
  }

  public setUserIdValue(id: number) {
    this.userId = id;
  }


  getFormControls(fGroup: FormGroup) {
    return fGroup.controls;
  }

  openSignUpModal() {
    this.modalService.open({template: this.templateModalSignUp, title: '¡Bienvenido(a) a MiCredix!'}, {
      width: 376,
      height: 623,
      disableClose: false
    });
  }

  getIdentificationTypes() {
    this.httpService.post('canales', 'global/identification-types', {channelId: 102})
      .pipe(finalize(() => this.identificationTypeChanged()))
      .subscribe(response => this.identifyTypes = response.identificationTypes.filter(idt => idt.id > 0));
  }

  identificationTypeChanged() {
    this.newUserFirstStepForm.controls.typeIdentification.valueChanges.subscribe(value => {
      if (value !== null) {
        this.newUserFirstStepForm.controls.identification.reset(null, {emitEvent: false});

        this.newUserFirstStepForm.controls.identification.enable();
      } else {
        this.newUserFirstStepForm.controls.identification.disable();
      }

      switch (value) {
        case 'CN': {
          this.identificationMask = '0-0000-0000';
          this.identificationMaxLength = 9;
          break;
        }
        case 'CJ': {
          this.identificationMask = '0-000-000000';
          this.identificationMaxLength = 10;
          break;
        }
        case 'CR': {
          this.identificationMask = '000000000000';
          this.identificationMaxLength = 12;
          break;
        }
        case 'PE': {
          this.identificationMask = '000000000000';
          this.identificationMaxLength = 12;
          break;
        }
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
      // .pipe()
      .subscribe(response => {
        this.cellNumber = response.phone;
        this.setUserIdValue(response.userId);
        this.showToast(response.type, response.message);
      });
  }

  getCodeAgain() {
    this.sendIdentification();
  }

  showToast(type, text: string) {
    this.toastService.show({text, type});
  }

  showPopupResult() {
    this.resultPopup = this.modalService.open({template: this.popupResults}, {width: 376, height: 349, disableClose: false});
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
      // .pipe(finalize(()=> this.showPopupResult()))
      .subscribe(response => {
        console.log(response);
        this.responseResult.message = response.message;
        this.responseResult.title = response.titleOne;
        this.responseResult.status = response.type;
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
        console.log(response);
        this.responseResult.message = response.message;
        this.responseResult.title = response.titleOne;
        this.responseResult.status = response.type;
      });
  }
}
