import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import {HttpService} from '../../../../core/services/http.service';
import {ModalService} from '../../../../core/services/modal.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-pin',
  templateUrl: './change-pin.component.html',
  styleUrls: ['./change-pin.component.scss'],
})
export class ChangPinComponent implements OnInit {
  changePinForm: FormGroup = new FormGroup({
    pin: new FormControl(null, [Validators.required]),
    confirmPin: new FormControl(null, [Validators.required]),
    code: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  }, {validators: this.pinValidator});
  hide = true;
  type = 'password';
  showResponse = false;
  respTitle: string;
  resType: string;
  respMsg: string;

  constructor(
    private modalService: ModalService,
    private httpService: HttpService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  pinValidator(control: FormGroup): ValidationErrors | null {
    const pin = control.get('pin');
    const repeatpin = control.get('confirmPin');
    if (repeatpin.errors && !repeatpin.errors.pinError) {
      return;
    }
    if (pin.value !== repeatpin.value) {
      repeatpin.setErrors({pinError: true});
    } else {
      repeatpin.setErrors(null);
    }
  }

  confirm() {
    this.modalService
      .confirmationPopup('¿Desea realizar este cambio?')
      .subscribe((res) => {
        if (res) {
          this.changePin();
        }
      });
  }

  changePin() {
    this.httpService
      .post('canales', 'security/modifysecuritykey', {
        newSecurityKey: CryptoJS.SHA256(this.changePinForm.get('pin').value),
        codeCredix: this.changePinForm.get('code').value,
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
