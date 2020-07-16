import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

import {ModalService} from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild('forgotPasswordTemplate') forgotPasswordTemplate: TemplateRef<any>;
  message: string;
  hide = true;
  hide1 = true;
  forgotPassForm: FormGroup;

  constructor(private dialog: MatDialog, private modalService: ModalService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.forgotPassForm = this.formBuilder.group(
      {
        identType: new FormControl(null, [Validators.required]),
        identNumber: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required]),
        confirmPassword: new FormControl(null, [Validators.required]),
        code: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      },
      {
        validator: this.MustMatch("password", "confirmPassword"),
      }
    );

  }

  openModal(){
    this.modalService.open({template: this.forgotPasswordTemplate, title: '¿Olvidó su clave?'},
    {width: 376, height: 663, disableClose:false});
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  get f() { return this.forgotPassForm.controls; }

}
