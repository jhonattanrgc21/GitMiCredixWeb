import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SecurityService} from '../../../../core/services/security.service';
import * as CryptoJS from 'crypto-js';
import {ModalService} from '../../../../core/services/modal.service';
import {SignUpComponent} from '../sign-up/sign-up.component';
import {ForgotPasswordComponent} from '../forgot-password/forgot-password.component';
import {MatDialogRef} from '@angular/material/dialog';
import {HttpService} from '../../../../core/services/http.service';
import {StorageService} from '../../../../core/services/storage.service';
import {Router} from '@angular/router';
import {CredixToastService} from '../../../../core/services/credix-toast.service';


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
    {
      otp: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  sessionActivateModal: MatDialogRef<any>;
  newDeviceModal: MatDialogRef<any>;
  showErrorMessage = false;
  forward = false;
  phone = '';
  @ViewChild('sessionActiveTemplate') sessionActiveTemplate: TemplateRef<any>;
  @ViewChild('newDeviceTemplate') newDeviceTemplate: TemplateRef<any>;

  constructor(private securityService: SecurityService,
              private modalService: ModalService,
              private httpService: HttpService,
              private storageService: StorageService,
              private router: Router,
              private toastService: CredixToastService) {

  }

  get f() {
    return this.signInformGroup.controls;
  }

  get g() {
    return this.newDeviceFormGroup.controls;
  }

  ngOnInit(): void {
  }

  login() {
    this.httpService.post('canales', 'security/userlogin', {
      username: this.signInformGroup.get('identification').value,
      password: CryptoJS.SHA256(this.signInformGroup.get('password').value).toString(),
      channelId: 102,
      deviceIdentifier: 1213123134,
      typeIncome: 2
    }).subscribe(data => {
        if (data.titleOne === 'success') {
          this.storageService.setCurrentSession(data);
          this.deviceInfo();
        } else if (data.titleOne === 'warn') {
          if (data.json.message === 'El usuario ya tiene una sesion activa') {
            this.open('session-activate');
          }
        } else if (data.titleOne === 'error') {

        }
      }
    );
  }

  open(modal: 'sign-up' | 'forgot-pass' | 'session-activate' | 'new-device') {
    switch (modal) {
      case 'sign-up':
        this.modalService.open({component: SignUpComponent, title: '¡Bienvenido(a) a MiCredix!'},
          {width: 376, minHeight: 623, disableClose: true});
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

  closeSessionActivate() {
    this.httpService.post('canales', 'security/logoutbyusername', {
      username: this.signInformGroup.get('identification').value,
      channelId: 102,
      deviceIdentifier: 1213123134,
      typeIncome: 2
    }).subscribe(data => {
        if (data.type === 'success') {
          this.storageService.removeCurrentSession();
          this.sessionActivateModal.close();
          this.login();
        }
      }
    );
  }

  sendOtp() {
    this.httpService.post('canales', 'security/getdatamaskednameapplicantsendotp', {
      identification: this.signInformGroup.get('identification').value,
      channelId: 102,
      typeIdentification: 1
    }).subscribe(data => {
      if (data.type === 'success') {
        if (this.forward === false) {
          this.phone = data.phone;
          this.open('new-device');
        } else {
          this.toastService.show({text: 'SMS enviado nuevamente', type: 'success'});
        }
      }
      if (data.type === 'error') {
        this.phone = '88**-**88';
        this.open('new-device');
      }
    });
  }

  validateOtp() {
    this.httpService.post('canales', 'security/validateonetimepassword', {
      channelId: 102,
      userId: 12345,
      validateToken: 1,
      usernameSecurity: 'sts_sac',
      passwordSecurity: '27ddddd7aa59f8c80837e6f46e79d5d5c05a4068914babbbf7745b43a2b21f47',
      confirmationCode: this.newDeviceFormGroup.get('otp').value
    }).subscribe(data => {
      if (data.type === 'success') {
        this.saveDevice();
      } else {
        this.showErrorMessage = data.descriptionOne;
      }
    });
  }

  saveDevice() {
    this.httpService.post('canales', 'channels/savedevice', {
      channelId: 102,
      deviceIdentification: '12345',
      platform: 1,
      uuid: 12345,
      carrierName: 'AT&T',
      platformVersion: '8.2.3',
      manufacturer: 'Xiaomi',
      model: 'Redmi note 8 pro',
      isoCountryCode: 'VE',
      mobileNetworkCode: '123',
      mobileCountryCode: '123',
      numberPhone: '1234567890',
      isActive: '1'
    }).subscribe(data => {
      if (data.type === 'success') {
        this.newDeviceModal.close();
        this.router.navigate(['/home']).then();
      } else {
        this.newDeviceModal.close();
        this.router.navigate(['/home']).then();
      }
    });
  }

  forwardOtp() {
    this.forward = true;
    this.sendOtp();
  }

  deviceInfo() {
    this.forward = false;
    this.httpService.post('canales', 'channels/getdeviceinfo', {
      channelId: 102,
      uuid: 12345
    }).subscribe(data => {
      if (data.type === 'success' && (data.id === 0 || data.id === 2)) {
        this.sendOtp();
      } else if (data.type === 'success' && data.id === 1) {
        this.router.navigate(['/home']).then();
      } else if (data.type === 'error') {
        this.router.navigate(['/home']).then();
      }
    });
  }

}
