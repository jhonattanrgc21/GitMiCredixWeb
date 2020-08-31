import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import {HttpService} from '../../../../core/services/http.service';
import {ModalService} from '../../../../core/services/modal.service';
import {Router} from '@angular/router';
import {StorageService} from '../../../../core/services/storage.service';

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
  identType;

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
    private router: Router,private storageService: StorageService,) { }

  ngOnInit(): void {
    this.getIdentType();
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

  getIdentType(){
    this.httpService.post('canales', 'applicant/finduserapplicantidentification',
    {
      channelId: 102,
	    identification: this.storageService.getIdentification()

    }).subscribe(res=>{
      this.identType = res.json.detail.applicant.identificationType.id;
    })
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
      .post('canales', 'security/user/forgetusernameandpasswordbyidentification', {

        codeCredix: this.changePasswordForm.get('code').value,
        typeIdentification : this.identType,
        identification: this.storageService.getIdentification(),
        channelId : 102,
        password : CryptoJS.SHA256(this.changePasswordForm.get('password').value),
        passwordConfirmation : CryptoJS.SHA256(this.changePasswordForm.get('password').value),
      })
      .subscribe((resp) => {
        console.log()
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
