import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalService} from '../../../../core/services/modal.service';
import {SignUpComponent} from './sign-up/sign-up.component';
import {MatDialogRef} from '@angular/material/dialog';
import {StorageService} from '../../../../core/services/storage.service';
import {Router} from '@angular/router';
import {SignInService} from './sign-in.service';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInformGroup: FormGroup = new FormGroup({
    identification: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  });
  newDeviceFormGroup: FormGroup = new FormGroup(
    {credixCode: new FormControl('', [Validators.required, Validators.minLength(6)])});
  sessionActivateModal: MatDialogRef<any>;
  newDeviceModal: MatDialogRef<any>;
  errorOtpMessage: string;
  otpSent = false;
  phone: string;
  userId: number;
  hide = true;
  @ViewChild('sessionActiveTemplate') sessionActiveTemplate: TemplateRef<any>;
  @ViewChild('newDeviceTemplate') newDeviceTemplate: TemplateRef<any>;

  constructor(private signInService: SignInService,
              private modalService: ModalService,
              private storageService: StorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.signInService.newDevice$.subscribe(() => this.open('session-activate'));
  }

  login() {
    this.signInService.login(this.signInformGroup.controls.identification.value, this.signInformGroup.controls.password.value)
      .subscribe(response => {
        if (response) {
          this.storageService.setCurrentSession(response.user, response.cards);
          this.otpSent = false;
          this.deviceInfo();
        }
      });
  }

  deviceInfo() {
    this.signInService.getDeviceInfo()
      .subscribe(response => {
        if (response.status === 'success' && (response.id === 0 || response.id === 2)) {
          this.sendOtp();
          this.open('new-device');
        }

        if (response.status === 'success' && response.id === 1) {
          this.router.navigate(['/home']).then();
        }
      });
  }

  sendOtp() {
    this.signInService.sendOtp(this.otpSent, this.signInformGroup.controls.identification.value).subscribe(user => {
      if (user) {
        this.phone = user.phoneNumber;
        this.userId = user.userId;
        this.otpSent = true;
      }
    });
  }

  validateOtp() {
    this.signInService.validateOtp(+this.newDeviceFormGroup.controls.credixCode.value, this.userId).subscribe(result => {
      if (result.status === 'success') {
        this.saveDevice();
      } else {
        this.newDeviceFormGroup.controls.credixCode.setErrors({invalid: true});
        this.newDeviceFormGroup.updateValueAndValidity();
        this.errorOtpMessage = result.message;
      }
    });
  }

  saveDevice() {
    this.signInService.saveDevice().subscribe(status => {
      if (status === 'success') {
        this.router.navigate(['/home']).then();
      } else {
        this.newDeviceModal.close();
      }
    });
  }

  closeSessionActivate() {
    this.signInService.logout(this.signInformGroup.controls.identification.value).subscribe(status => {
        if (status === 'success') {
          this.storageService.removeCurrentSession();
          this.sessionActivateModal.close();
          this.login();
        }
      }
    );
  }

  open(modal: 'sign-up' | 'forgot-pass' | 'session-activate' | 'new-device') {
    switch (modal) {
      case 'sign-up':
        this.modalService.open({component: SignUpComponent, title: '¡Bienvenido(a) a MiCredix!'},
          {width: 376, minHeight: 623, disableClose: true, panelClass: 'sign-up-panel'});
        break;
      case 'forgot-pass':
        this.modalService.open({component: ForgotPasswordComponent, title: '¿Olvidó su clave?'},
          {width: 376, height: 663, disableClose: true});
        break;
      case 'session-activate':
        this.sessionActivateModal = this.modalService.open({template: this.sessionActiveTemplate, hideCloseButton: true},
          {width: 376, height: 452, disableClose: true, panelClass: 'sign-in-result-panel'});
        break;
      case 'new-device':
        this.newDeviceModal = this.modalService.open({
            template: this.newDeviceTemplate,
            hideCloseButton: false,
            title: 'Validación de Identidad'
          },
          {width: 376, height: 623, disableClose: true, panelClass: 'new-device-panel'});
        break;
      default:
        this.modalService.open({component: SignUpComponent, title: '¡Bienvenido(a) a MiCredix!'},
          {width: 376, height: 623, disableClose: true});
        break;
    }
  }

}
