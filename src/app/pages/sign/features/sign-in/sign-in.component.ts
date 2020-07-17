import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SecurityService} from "../../../../core/services/security.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.email, Validators.maxLength(50), Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)])
  });
  isLoading = false;
  hidePassword = true;
  constructor(private securityService: SecurityService) {
  }

  submit() {
    if (this.formGroup.valid) {
      this.isLoading = true;
      /*this.httpService.put(SecurityRoutes.BASE_URI + SecurityRoutes.USERS_SIGN_IN_URI, {
        username: this.formGroup.get('username').value,
        password: this.formGroup.get('password').value,
      })
        .pipe(finalize(() => {
          this.isLoading = false;
          this.router.navigate(['/home/dashboard']).then();
        }))
        .subscribe();*/
    }
  }

  ngOnInit(): void {
    this.securityService.userLogin();
  }

  hasError(controlName: string, errorName: string) {
    return this.formGroup.controls[controlName].hasError(errorName);
  }

  toggleHidePassword() {
    this.hidePassword = !this.hidePassword;
  }

}
