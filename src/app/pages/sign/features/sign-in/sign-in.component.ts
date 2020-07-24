import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SecurityService} from "../../../../core/services/security.service";
import {StorageService} from "../../../../core/services/storage.service";
import * as CryptoJS from "crypto-js";

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
  isLoading = false;
  hide = true;
  idenMask = "0-0000-0000";
  constructor(private securityService: SecurityService,
              private storageService: StorageService) {
  }

  submit() {
    this.securityService.userLogin(
      {
        username: this.signInformGroup.get("identification").value,
        password: CryptoJS.SHA256(this.signInformGroup.get("password").value).toString(),
        channelId : 102,
        deviceIdentifier : 1213123134,
        typeIncome : 2
      }
    )
  }

  ngOnInit(): void {

  }

  hasError(controlName: string, errorName: string) {
    return this.signInformGroup.controls[controlName].hasError(errorName);
  }

  get f() {
    return this.signInformGroup.controls;
  }

  closeSessionActivate(){
    this.securityService.closeSessionActivate(
      {
        username: this.signInformGroup.get("identification").value,
        password: CryptoJS.SHA256(this.signInformGroup.get("password").value).toString(),
        channelId : 102,
        deviceIdentifier : 1213123134,
        typeIncome : 2
      }
    )
  }
}
