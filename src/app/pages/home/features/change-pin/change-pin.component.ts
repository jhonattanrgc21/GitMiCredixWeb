import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import {HttpService} from 'src/app/core/services/http.service';


@Component({
  selector: 'app-change-pin',
  templateUrl: './change-pin.component.html',
  styleUrls: ['./change-pin.component.scss']
})
export class ChangePinComponent implements OnInit {
  hide = true;
  type = 'password';

  changePinForm: FormGroup = new FormGroup(
    {
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required, Validators.minLength(6)]),
    },
    {validators: this.passwordValidator}
  );

  constructor() { }

  ngOnInit(): void {
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

  next(){

  }

}
