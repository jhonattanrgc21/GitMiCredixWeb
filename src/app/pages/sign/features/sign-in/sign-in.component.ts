import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SecurityService} from '../../../../core/services/security.service';
import * as CryptoJS from 'crypto-js';
import {ModalService} from '../../../../core/services/modal.service';
import {SignUpComponent} from '../sign-up/sign-up.component';
import {ForgotPasswordComponent} from '../forgot-password/forgot-password.component';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInformGroup: FormGroup = new FormGroup({
    identification: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)])
  });
  hide = true;
  identificationMask = '0-0000-0000';
  deviceInfo;
  isMobile;
  isTablet;
  isDesktopDevice;


  constructor(private securityService: SecurityService,
              private modalService: ModalService,
              ) {
  }

  get f() {
    return this.signInformGroup.controls;
  }

  ngOnInit(): void {
  }

  submit() {
    this.securityService.userLogin(
      {
        username: this.signInformGroup.get('identification').value,
        password: CryptoJS.SHA256(this.signInformGroup.get('password').value).toString(),
        channelId: 102,
        deviceIdentifier: 1213123134,
        typeIncome: 2
      }
    );
  }

  hasError(controlName: string, errorName: string) {
    return this.signInformGroup.controls[controlName].hasError(errorName);
  }

  open(modal: 'sign-up' | 'forgot-pass') {
    switch (modal) {
      case 'sign-up':
        this.modalService.open({component: SignUpComponent, title: '¡Bienvenido(a) a MiCredix!'},
          {width: 376, height: 623, disableClose: true});
        break;
      case 'forgot-pass':
        this.modalService.open({component: ForgotPasswordComponent, title: '¿Olvidó su clave?'},
          {width: 376, height: 663, disableClose: true});
        break;
      default:
        this.modalService.open({component: SignUpComponent, title: '¡Bienvenido(a) a MiCredix!'},
          {width: 376, height: 623, disableClose: true});
        break;
    }
  }

  closeSessionActivate() {
    this.securityService.closeSessionActivate(
      {
        username: this.signInformGroup.get('identification').value,
        password: CryptoJS.SHA256(this.signInformGroup.get('password').value).toString(),
        channelId: 102,
        deviceIdentifier: 1213123134,
        typeIncome: 2
      }
    );
  }


}
