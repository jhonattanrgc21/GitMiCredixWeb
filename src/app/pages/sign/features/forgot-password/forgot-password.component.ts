import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
  ValidatorFn,
  ValidationErrors,
} from "@angular/forms";
import { Router } from "@angular/router";
import { finalize } from "rxjs/operators";
import * as CryptoJS from "crypto-js";

import { ModalService } from "src/app/core/services/modal.service";
import { HttpService } from "src/app/core/services/http.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild("forgotPasswordTemplate") forgotPasswordTemplate: TemplateRef<any>;
  message: string = "";
  showErrorMessage: boolean = false;
  identTypes: string[];
  hide = true;
  hide1 = true;
  identMask = "0-0000-0000";
  identMaxLength = 0;
  submitted: boolean = false;

  passwordValidator: ValidatorFn = (
    control: FormGroup
  ): ValidationErrors | null => {
    const password = control.get("password");
    const repeatPassword = control.get("confirmPassword");
    if (repeatPassword.errors && !repeatPassword.errors.passwordError) {
      return;
    }
    if (password.value !== repeatPassword.value) {
      repeatPassword.setErrors({ passwordError: true });
    } else {
      repeatPassword.setErrors(null);
    }
  };

  forgotPassForm: FormGroup = new FormGroup(
    {
      identType: new FormControl("", [Validators.required]),
      identNumber: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      confirmPassword: new FormControl("", [Validators.required]),
      code: new FormControl("", [Validators.required, Validators.minLength(6)]),
    },
    { validators: this.passwordValidator }
  );

  constructor(
    private modalService: ModalService,
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getIdentTypes();
  }

  openModal() {
    this.modalService.open(
      { template: this.forgotPasswordTemplate, title: "¿Olvidó su clave?" },
      { width: 376, height: 663, disableClose: false }
    );
  }

  get f() {
    return this.forgotPassForm.controls;
  }

  getIdentTypes() {
    this.httpService
      .post("canales", "global/identification-types", {
        channelId: 102,
      })
      .pipe(finalize(() => this.identificationTypeChanged()))
      .subscribe(
        (response) =>
          (this.identTypes = response.identificationTypes.filter(
            (idt) => idt.id > 0
          ))
      );
  }

  submit() {
    if (this.forgotPassForm.valid) {
      this.httpService
        .post(
          "canales",
          "security/user/forgetusernameandpasswordbyidentification",
          {
            codeCredix: this.forgotPassForm.get("code").value,
            typeIdentification: this.forgotPassForm.get("identType").value,
            identification: this.forgotPassForm.get("identNumber").value,
            channelId: 102,
            password: CryptoJS.SHA256(
              this.forgotPassForm.get("password").value
            ),
            passwordConfirmation: CryptoJS.SHA256(
              this.forgotPassForm.get("confirmPassword").value
            ),
          }
        )
        .pipe(
          finalize(() => {
            //this.router.navigate(['/sign/sign-in']).then();
          })
        )
        .subscribe((res) => {
          this.submitted = true;
          if ((res.type = "success")) {
            console.log(res);
            this.message = res.message;
            this.showErrorMessage = true;
          } else {
            this.message = res.message;
            console.log(this.message);
            this.showErrorMessage = true;
          }
        });
    }
  }

  identificationTypeChanged() {
    this.forgotPassForm.controls.identType.valueChanges.subscribe((value) => {
      if (value !== null) {
        this.forgotPassForm.controls.identNumber.reset(null, {
          emitEvent: false,
        });
        this.forgotPassForm.controls.identNumber.enable();
      } else {
        this.forgotPassForm.controls.identNumber.disable();
      }

      switch (value) {
        case "CN": {
          this.identMask = "0-0000-0000";
          this.identMaxLength = 9;
          break;
        }
        case "CJ": {
          this.identMask = "0-000-000000";
          this.identMaxLength = 10;
          break;
        }
        case "CR": {
          this.identMask = "000000000000";
          this.identMaxLength = 12;
          break;
        }
        case "PE": {
          this.identMask = "000000000000";
          this.identMaxLength = 12;
          break;
        }
      }
    });
  }
}
