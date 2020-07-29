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
  sessionActivateModal: MatDialogRef<any>;
  @ViewChild('sessionActiveTemplate') sessionActiveTemplate: TemplateRef<any>;

  constructor(private securityService: SecurityService,
              private modalService: ModalService,
              private httpService: HttpService,
              private storageService: StorageService,
              private router: Router) {

  }

  get f() {
    return this.signInformGroup.controls;
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
        this.router.navigate(['/home']).then();
      } else if (data.titleOne === 'warn' && data.json.message === 'El usuario ya tiene una sesion activa') {
        this.open('session-activate');
      }
      }
    );
  }

  hasError(controlName: string, errorName: string) {
    return this.signInformGroup.controls[controlName].hasError(errorName);
  }

  open(modal: 'sign-up' | 'forgot-pass' | 'session-activate') {
    switch (modal) {
      case 'sign-up':
        this.modalService.open({component: SignUpComponent, title: '¡Bienvenido(a) a MiCredix!'},
          {width: 376, height: 623, disableClose: true});
        break;
      case 'forgot-pass':
        this.modalService.open({component: ForgotPasswordComponent, title: '¿Olvidó su clave?'},
          {width: 376, height: 663, disableClose: true});
        break;
      case 'session-activate':
        this.sessionActivateModal = this.modalService.open({template: this.sessionActiveTemplate, hideCloseButton: true},
          {width: 376, height: 452, disableClose: true});
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


}
