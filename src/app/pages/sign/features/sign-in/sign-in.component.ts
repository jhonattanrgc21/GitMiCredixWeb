import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalService} from '../../../../core/services/modal.service';
import {SignUpComponent} from './sign-up/sign-up.component';
import {MatDialogRef} from '@angular/material/dialog';
import {StorageService} from '../../../../core/services/storage.service';
import {Router} from '@angular/router';
import {SignInService} from './sign-in.service';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {PopupCompletedComponent} from './popup-completed/popup-completed.component';
import {v4 as uuidv4} from 'uuid';
import {finalize, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {CredixBotService} from '../../../../core/services/credix-bot.service';
import {CdkStepper} from '@angular/cdk/stepper';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  signInformGroup: FormGroup = new FormGroup({
    identification: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  });
  shippingTypeFormControl: FormControl = new FormControl(null, [Validators.required]);
  newDeviceFormGroup: FormGroup = new FormGroup(
    {credixCode: new FormControl('', [Validators.required, Validators.minLength(6)])});
  sessionActivateModal: MatDialogRef<any>;
  newDeviceModal: MatDialogRef<any>;
  errorOtpMessage: string;
  otpSent = false;
  phone: string;
  userId: number;
  hide = true;
  email: string;
  labelEmail = '';
  labelPhone = '';
  errorMessage: string;
  unsubscribe = new Subject();
  stepIndex = 0;
  @ViewChild('sessionActiveTemplate') sessionActiveTemplate: TemplateRef<any>;
  @ViewChild('newDeviceTemplate') newDeviceTemplate: TemplateRef<any>;
  @ViewChild('stepper') stepper: CdkStepper;

  constructor(private readonly signInService: SignInService,
              private readonly credixBotService: CredixBotService,
              private readonly modalService: ModalService,
              private readonly storageService: StorageService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    if (!this.storageService.getUuid()) {
      this.storageService.setUuid(uuidv4());
    }
  }

  login() {
    if (this.signInformGroup.valid) {
      this.signInService.login(this.signInformGroup.controls.identification.value, this.signInformGroup.controls.password.value)
        .subscribe(response => {

          switch (response.type) {
            case 'success':
              if (!this.credixBotService.isFromBot) {
                this.storageService.setCurrentSession(response.user, response.cards);
                this.otpSent = false;
                this.deviceInfo();
              } else {
                const fragmentUri = this.credixBotService.redirectUri.split('redirect_uri=')[1];
                window.location.href =
                  `${fragmentUri}&authorization_code=${this.storageService.getCurrentToken()}`;
              }
              break;
            case 'warn':
              this.open('session-activate');
              break;
            default:
              break;
          }

        }, (error: Error) => {
          this.errorMessage = error.message;
          this.signInformGroup.controls.password.setErrors({invalid: true});
          this.signInformGroup.updateValueAndValidity();
          this.checkChanges();
        });
    }

  }

  deviceInfo() {
    this.signInService.getDeviceInfo()
      .pipe(finalize(() => {
        this.labelEmail = `Correo: ${this.email}`;
        this.labelPhone = `SMS: ${this.phone}`;
      }))
      .subscribe(response => {
        if (response.status === 'success' && (response.id === 0 || response.id === 2)) {
          this.open('new-device');
          this.email = response.email;
          this.phone = response.phone;
        }

        if (response.status === 'success' && response.id === 1) {
          this.router.navigate(['/home']).then();
        }
      });
  }

  sendOtp() {
    this.signInService.sendOtp(
      this.otpSent,
      this.signInformGroup.controls.identification.value,
      this.shippingTypeFormControl.value).subscribe(user => {
      if (user) {
        this.userId = user.userId;
        this.otpSent = true;
      }
    });
  }

  validateOtp() {
    this.signInService.validateOtp(+this.newDeviceFormGroup.controls.credixCode.value, this.userId).subscribe(result => {
      if (result.status === 'success') {
        this.saveDevice();
        this.newDeviceModal.close();
      } else {
        this.newDeviceFormGroup.controls.credixCode.setErrors({invalid: true});
        this.newDeviceFormGroup.updateValueAndValidity();
        this.errorOtpMessage = result.message;
      }
    });
  }

  saveDevice() {
    this.signInService.saveDevice().subscribe(status => {
      if (status === 'success') {
        this.router.navigate(['/home']).then();
      } else {
        this.newDeviceModal.close();
      }
    });
  }

  closeSessionActivate() {
    this.signInService.logout(this.signInformGroup.controls.identification.value)
      .pipe(finalize(() => this.sessionActivateModal.close()))
      .subscribe(status => {
          if (status === 'success') {
            this.storageService.removeCurrentSession();
            this.sessionActivateModal.close();
            this.login();
          }
        }
      );
  }

  open(modal: 'sign-up' | 'forgot-pass' | 'session-activate' | 'new-device') {
    switch (modal) {
      case 'sign-up':
        this.modalService.open({component: SignUpComponent, title: 'Recuperar o crear clave'},
          {
            width: 608,
            height: 688,
            disableClose: true,
            panelClass: 'sign-up-panel'
          }).afterClosed().subscribe(user => {
          if (user) {
            this.signInformGroup.controls.identification.setValue(user.identification);
            this.signInformGroup.controls.password.setValue(user.password);
            this.openCompletedModal(608, 688, {
              title: '¡Éxito!',
              message: 'Su clave ha sido generada correctamente.',
              type: 'sign-up'
            });
          }
        });
        break;
      case 'forgot-pass':
        this.modalService.open({component: ForgotPasswordComponent, title: '¿Olvidó su clave?'},
          {width: 376, height: 680, disableClose: true}).afterClosed().subscribe(user => {
          if (user) {
            this.signInformGroup.controls.identification.setValue(user.identification);
            this.signInformGroup.controls.password.setValue(user.password);
            this.openCompletedModal(376, 349, {title: '¡Éxito!', message: 'Su clave ha sido cambiada.', type: 'forgot-pass'});
          }
        });
        break;
      case 'session-activate':
        this.sessionActivateModal = this.modalService.open({template: this.sessionActiveTemplate, hideCloseButton: true},
          {width: 376, height: 452, disableClose: true, panelClass: 'sign-in-result-panel'});
        break;
      case 'new-device':
        this.newDeviceModal = this.modalService.open({
            template: this.newDeviceTemplate,
            hideCloseButton: false,
            title: 'Validación de Identidad'
          },
          {width: 608, height: 688, disableClose: true, panelClass: 'new-device-panel'});
        break;
      default:
        this.modalService.open({component: SignUpComponent, title: '¡Bienvenido(a) a MiCredix!'},
          {width: 376, height: 623, disableClose: true});
        break;
    }
  }

  openCompletedModal(width: number, height: number, data: any) {
    this.modalService.openModalContainer(PopupCompletedComponent, width, height, data).subscribe(() => {
      this.login();
    });
  }

  checkChanges() {
    this.signInformGroup.controls.identification.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(value => {
        if (this.signInformGroup.controls.password.errors?.invalid) {
          this.signInformGroup.controls.password.setErrors(null);
          this.signInformGroup.updateValueAndValidity();
          this.unsubscribe.next();
          this.unsubscribe.complete();
        }
      });
  }

  next() {
    this.stepper.next();
    this.stepIndex = this.stepper.selectedIndex;
    this.sendOtp();
  }

  back() {
    this.stepper.previous();
    this.stepIndex = this.stepper.selectedIndex;
  }

  shippingTypeChange(event) {
    this.shippingTypeFormControl.setValue(event.value);
  }

  ngOnDestroy(): void {
    this.signInService.unsubscribe();
  }
}
