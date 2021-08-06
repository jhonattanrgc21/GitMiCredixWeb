import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {HttpService} from '../../../../../core/services/http.service';
import {ModalService} from '../../../../../core/services/modal.service';
import {TagsService} from '../../../../../core/services/tags.service';
import {Tag} from '../../../../../shared/models/tag';
import {finalize} from 'rxjs/operators';
import {ChangePinService} from '../pin-code.service';
import {CredixCodeErrorService} from '../.././../../../core/services/credix-code-error.service';
import { CardPin } from 'src/app/shared/models/card-pin';
import { Router } from '@angular/router';
import { PublicServicesApiService } from 'src/app/core/services/public-services-api.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-change-pin',
  templateUrl: './change-pin.component.html',
  styleUrls: ['./change-pin.component.scss'],
})
export class ChangePinComponent implements OnInit, OnDestroy {
  changePinForm: FormGroup = new FormGroup({
    pin: new FormControl(null, [Validators.required]),
    confirmPin: new FormControl(null, [Validators.required]),
    credixCode: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  }, {validators: this.pinValidator});
  hidePin = true;
  hideConfirmPin = true;
  type: 'text' | 'password' = 'password';
  done = false;
  title: string;
  status: 'success' | 'error';
  message: string;
  titleTag: string;
  questionTag: string;
  newPin: Boolean = false;
  cardPin: CardPin;
  codeStatus: Number;

  constructor(private changePinService: ChangePinService,
              private credixCodeErrorService: CredixCodeErrorService,
              private modalService: ModalService,
              private httpService: HttpService,
              private tagsService: TagsService,
              private router: Router,
              private publicServicesApiService: PublicServicesApiService,
              ) {
  }

  ngOnInit(): void {
    if ( this.changePinService.cardPin ) {
      this.cardPin = this.changePinService.cardPin;
    } else {
      this.router.navigate(['/home/current-pin']);
    }

    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
        this.getTags(functionality.find(fun => fun.description === 'Cambiar PIN').tags));
      this.credixCodeErrorService.credixCodeError$.subscribe(() => {
        this.changePinForm.controls.credixCode.setErrors({invalid: true});
        this.changePinForm.updateValueAndValidity();
      });
  }

  confirm() {
    this.modalService.confirmationPopup(this.questionTag || '¿Desea realizar este cambio?')
      .subscribe((confirmation) => {
        if (confirmation) {
          this.changePin();
        }
      });
  }

  changePin() {
    this.changePinService.changePin(this.changePinForm.controls.pin.value, this.changePinForm.controls.credixCode.value, this.cardPin.cardId)
      .pipe(finalize(() => this.done = this.changePinForm.controls.credixCode.valid))
      .subscribe(result => {
        this.title = result.title;
        this.status = result.type;
        this.message = result.message;
        this.codeStatus = result.status;
      });
  }

  getTags(tags: Tag[]) {
    this.titleTag = tags.find(tag => tag.description === 'cambiarpin.title')?.value;
    this.questionTag = tags.find(tag => tag.description === 'cambiarpin.question')?.value;
  }

  pinValidator(control: FormGroup): ValidationErrors | null {
    const pin = control.get('pin');
    const confirmPin = control.get('confirmPin');
    if (confirmPin.errors && !confirmPin.errors.pinError) {
      return;
    }
    if (pin.value !== confirmPin.value) {
      confirmPin.setErrors({pinError: true});
    } else {
      confirmPin.setErrors(null);
    }
  }

  generateNewPin() {
    if ( this.status === 'success' || ( this.codeStatus === 403 ) ) {
      this.router.navigate(['/home']);
    } else {
      //Generar ticket para solicitud de nuevo pin
      this.changePinService.newTicketPin(this.cardPin.cardId).subscribe(result => {
        this.newPin = true;
        this.title = result.title
        this.status = result.type;
        this.message = result.message;
        this.codeStatus = result.status;
      });
    }
    
  }

  ngOnDestroy(): void {
    this.changePinService.unsubscribe();
  }
}
