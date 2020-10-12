import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ModalService} from '../../../../core/services/modal.service';
import {TagsService} from '../../../../core/services/tags.service';
import {Tag} from '../../../../shared/models/tag';
import {finalize} from 'rxjs/operators';
import {ChangePasswordService} from './change-password.service';
import {CredixCodeErrorService} from '../../../../core/services/credix-code-error.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),
    credixCode: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  }, {validators: this.passwordValidator});
  hidePassword = true;
  hideConfirmPassword = true;
  type: 'text' | 'password' = 'password';
  done = false;
  title: string;
  status: 'success' | 'error';
  message: string;
  identType: number;
  titleTag: string;
  questionTag: string;

  constructor(private changePasswordService: ChangePasswordService,
              private credixCodeErrorService: CredixCodeErrorService,
              private modalService: ModalService,
              private tagsService: TagsService) {
  }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Cambiar clave').tags));
    this.credixCodeErrorService.credixCodeError$.subscribe(() => {
      this.changePasswordForm.controls.credixCode.setErrors({invalid: true});
      this.changePasswordForm.updateValueAndValidity();
    });
  }

  confirm() {
    this.modalService.confirmationPopup(this.questionTag || '¿Desea realizar este cambio?')
      .subscribe((confirmation) => {
        if (confirmation) {
          this.changePassword();
        }
      });
  }

  changePassword() {
    this.changePasswordService
      .changePassword(this.changePasswordForm.controls.credixCode.value, this.changePasswordForm.controls.password.value)
      .pipe(finalize(() => this.done = this.changePasswordForm.controls.credixCode.valid))
      .subscribe(result => {
        this.title = result.title;
        this.status = result.type;
        this.message = result.message;
      });
  }

  getTags(tags: Tag[]) {
    this.titleTag = tags.find(tag => tag.description === 'cambiarclave.title')?.value;
    this.questionTag = tags.find(tag => tag.description === 'cambiarclave.question')?.value;
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
}
