import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import {HttpService} from '../../../../core/services/http.service';
import {ModalService} from '../../../../core/services/modal.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  hide = true;
  type = 'password';
  showResponse = false;
  respTitle: string;
  resType: string;
  respMsg: string;

  changePasswordForm: FormGroup = new FormGroup(
    {
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
      code: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    },
    {validators: this.passwordValidator}
  );

  constructor(private modalService: ModalService,
    private httpService: HttpService,
    private router: Router,) { }

  ngOnInit(): void {
  }

  passwordValidator(control: FormGroup): ValidationErrors | null {
    const password = control.get('password');
    const repeatPassword = control.get('confirmpassword');
    if (repeatPassword.errors && !repeatPassword.errors.passwordError) {
      return;
    }
    if (password.value !== repeatPassword.value) {
      repeatPassword.setErrors({passwordError: true});
    } else {
      repeatPassword.setErrors(null);
    }
  }

  confirm() {
    this.modalService
      .confirmationPopup('¿Desea realizar este cambio?')
      .subscribe((res) => {
        if (res) {
          this.changepassword();
        }
      });
  }

  changepassword() {
    this.httpService
      .post('canales', 'security/modifysecuritykey', {
        newSecurityKey: CryptoJS.SHA256(this.changePasswordForm.get('password').value),
        codeCredix: this.changePasswordForm.get('code').value,
        channelId: 102,
      })
      .subscribe((resp) => {
        this.showResponse = true;
        this.respTitle = resp.titleOne;
        this.resType = resp.type;
        this.respMsg = resp.descriptionOne;
      });
  }

  done() {
    this.router.navigate(['/home']).then();
  }
}
