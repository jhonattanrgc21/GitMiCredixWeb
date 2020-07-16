import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ModalService } from '../../../../core/services/modal.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  newUserFirstStepForm: FormGroup = new FormGroup({
        typeIdentification: new FormControl('', [Validators.required]),
        identification: new FormControl('', [Validators.required])
      });
  newUserSecondStepForm: FormGroup = new FormGroup({
        confirmationCode: new FormControl('' , [Validators.required, Validators.maxLength(6)])
      });
  newUserThirstyStepForm: FormGroup = new FormGroup({
        newPassword: new FormControl('',[Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required])
      });


  @ViewChild('templateModalSignUp') templateModalSignUp: TemplateRef<any>;

  constructor(private dialog: MatDialog, private modalService: ModalService) { }

  ngOnInit(): void {
  }


  openSignUpModal(){
    this.modalService.open({template: this.templateModalSignUp, title:'¡Bienvenido(a) a MiCredix!'}, {width: 376, height: 623, disableClose: false});
  }

  continueButton(){
    console.log('Continue');
  }

}
