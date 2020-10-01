import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {HttpService} from '../../../../core/services/http.service';
import {ModalService} from '../../../../core/services/modal.service';
import {TagsService} from '../../../../core/services/tags.service';
import {Tag} from '../../../../shared/models/tag';
import {finalize} from 'rxjs/operators';
import {ChangePinService} from './change-pin.service';

@Component({
  selector: 'app-change-pin',
  templateUrl: './change-pin.component.html',
  styleUrls: ['./change-pin.component.scss'],
})
export class ChangePinComponent implements OnInit {
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

  constructor(private changePinService: ChangePinService,
              private modalService: ModalService,
              private httpService: HttpService,
              private tagsService: TagsService) {
  }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Cambiar PIN').tags));
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
        this.title = result.title;
        this.status = result.type;
        this.message = result.message;
        if (result.status && result.status === 406) {
          this.changePinForm.controls.credixCode.setErrors({invalid: true});
          this.changePinForm.updateValueAndValidity();
        }
      });
  }

  getTags(tags: Tag[]) {
    this.titleTag = tags.find(tag => tag.description === 'cambiarpin.title')?.value;
    this.questionTag = tags.find(tag => tag.description === 'cambiarpin.question')?.value;
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
}
