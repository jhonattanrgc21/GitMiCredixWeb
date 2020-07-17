import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ModalService } from '../../../../core/services/modal.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IdentifyTypes } from 'src/app/shared/models/IdentifyModel/IndentifyTypes';
import { HttpService } from 'src/app/core/services/http.service';
import { finalize } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  identifyTypes: IdentifyTypes[];
  cellNumber: string = '88**-**88';
  identificationMask = '0-0000-0000';
  identificationMaxLength = 0;

  newUserFirstStepForm: FormGroup = new FormGroup({
        typeIdentification: new FormControl('', [Validators.required]),
        identification: new FormControl('', [Validators.required])
      });

  newUserSecondStepForm: FormGroup = new FormGroup(
  {confirmationCode: new FormControl('' , [Validators.required])});

  newUserThirstyStepForm: FormGroup = new FormGroup({
        newPassword: new FormControl('',[Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required])
      });


  @ViewChild('templateModalSignUp') templateModalSignUp: TemplateRef<any>;

  constructor(
    private dialog: MatDialog,
    private modalService: ModalService,
    private httpService: HttpService) { }

  ngOnInit(): void {
    this.getIdentificationTypes();
  }



  get fSecondControl() {
    return this.newUserSecondStepForm.controls;
  }


  getFormControls(fGroup: FormGroup) { return fGroup.controls}

  openSignUpModal(){
    this.modalService.open({template: this.templateModalSignUp, title:'¡Bienvenido(a) a MiCredix!'}, {width: 376, height: 623, disableClose: false});
  }

  getIdentificationTypes() {
    this.httpService.post( 'canales', 'qacanalesbe.credix.com/api/canalesbe/global/identification-types', {"channelId": 102})
    .pipe(finalize(() => this.identificationTypeChanged()))
    .subscribe( response => this.identifyTypes = response.identificationTypes.filter(idt => idt.id > 0));
  }

  identificationTypeChanged() {
    this.newUserFirstStepForm.controls.typeIdentification.valueChanges.subscribe(value => {
        if (value !== null) {
            this.newUserFirstStepForm.controls.identification.reset(null, {emitEvent: false});

            this.newUserFirstStepForm.controls.identification.enable();
        } else {
            this.newUserFirstStepForm.controls.identification.disable();
        }

        switch (value) {
            case 'CN': {
                this.identificationMask = '0-0000-0000';
                this.identificationMaxLength = 9;
                break;
            }
            case 'CJ': {
                this.identificationMask = '0-000-000000';
                this.identificationMaxLength = 10;
                break;
            }
            case 'CR': {
                this.identificationMask = '000000000000';
                this.identificationMaxLength = 12;
                break;
            }
            case 'PE': {
                this.identificationMask = '000000000000';
                this.identificationMaxLength = 12;
                break;
            }
        }
    });
  }

  continueButton(){
    console.log('Continue');
  }

}
