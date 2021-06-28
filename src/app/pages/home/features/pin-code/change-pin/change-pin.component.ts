import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {HttpService} from '../../../../../core/services/http.service';
import {ModalService} from '../../../../../core/services/modal.service';
import {TagsService} from '../../../../../core/services/tags.service';
import {Tag} from '../../../../../shared/models/tag';
import {finalize} from 'rxjs/operators';
import {ChangePinService} from '../pin-code.service';
import {CredixCodeErrorService} from '../.././../../../core/services/credix-code-error.service';

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
  done = true;
  title: string;
  status: 'success' | 'error';
  message: string;
  titleTag: string;
  questionTag: string;
  newPin: Boolean = false;
  showAlert: Boolean = false;

  constructor(private changePinService: ChangePinService,
              private credixCodeErrorService: CredixCodeErrorService,
              private modalService: ModalService,
              private httpService: HttpService,
              private tagsService: TagsService) {
  }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Cambiar PIN').tags));
    this.credixCodeErrorService.credixCodeError$.subscribe(() => {
      this.changePinForm.controls.credixCode.setErrors({invalid: true});
      this.changePinForm.updateValueAndValidity();
    });

    this.title = "Opps...";
    this.status = "error";
    this.message = "Su PIN no se puede cambiar porque se encuentra bloqueado. En este caso debemos generarle un PIN totalmente nuevo.";
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
    this.changePinService.changePin(this.changePinForm.controls.pin.value, this.changePinForm.controls.credixCode.value)
      .pipe(finalize(() => this.done = this.changePinForm.controls.credixCode.valid))
      .subscribe(result => {
        this.showAlert = true;
        this.title = result.title;
        this.status = result.type;
        this.message = result.message;
      });
  }

  getTags(tags: Tag[]) {
    console.log("tags: ", tags);
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
    this.showAlert = false;

    setTimeout(() => {
      this.newPin = true;

    }, 3000)
    console.log("newPin");
  }

  ngOnDestroy(): void {
    this.changePinService.unsubscribe();
  }
}
