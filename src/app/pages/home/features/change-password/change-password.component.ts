import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import {HttpService} from '../../../../core/services/http.service';
import {ModalService} from '../../../../core/services/modal.service';
import {Router} from '@angular/router';
import {StorageService} from '../../../../core/services/storage.service';
import {TagsService} from '../../../../core/services/tags.service';
import {Tag} from '../../../../shared/models/tag';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),
    code: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  }, {validators: this.passwordValidator});
  hide = true;
  type = 'password';
  showResponse = false;
  respTitle: string;
  resType: string;
  respMsg: string;
  identType: number;
  titleTag: string;
  questionTag: string;

  constructor(private modalService: ModalService,
              private httpService: HttpService,
              private tagsService: TagsService,
              private router: Router,
              private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.getIdentType();
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Cambiar clave').tags));
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

  getIdentType() {
    this.httpService.post('canales', 'applicant/finduserapplicantidentification',
      {
        channelId: 102,
        identification: this.storageService.getIdentification()

      }).subscribe(res => {
      this.identType = res.json.detail.applicant.identificationType.id;
    });
  }

  confirm() {
    this.modalService
      .confirmationPopup(this.questionTag || '¿Desea realizar este cambio?')
      .subscribe((res) => {
        if (res) {
          this.changePassword();
        }
      });
  }

  changePassword() {
    this.httpService
      .post('canales', 'security/user/forgetusernameandpasswordbyidentification', {

        codeCredix: this.changePasswordForm.get('code').value,
        typeIdentification: this.identType,
        identification: this.storageService.getIdentification(),
        channelId: 102,
        password: CryptoJS.SHA256(this.changePasswordForm.get('password').value),
        passwordConfirmation: CryptoJS.SHA256(this.changePasswordForm.get('password').value),
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

  getTags(tags: Tag[]) {
    this.titleTag = tags.find(tag => tag.description === 'cambiarclave.title').value;
    this.questionTag = tags.find(tag => tag.description === 'cambiarclave.question').value;
  }
}
