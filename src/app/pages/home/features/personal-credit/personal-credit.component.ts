import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CdkStepper} from '@angular/cdk/stepper';
import {PersonalCreditService} from './personal-credit.service';
import {ConvertStringAmountToNumber} from '../../../../shared/utils';
import {ModalService} from '../../../../core/services/modal.service';
import {Router} from '@angular/router';
import {CredixToastService} from '../../../../core/services/credix-toast.service';
import {StorageService} from '../../../../core/services/storage.service';
import {finalize} from 'rxjs/operators';
import {ChannelsApiService} from '../../../../core/services/channels-api.service';

@Component({
  selector: 'app-personal-credit',
  templateUrl: './personal-credit.component.html',
  styleUrls: ['./personal-credit.component.scss']
})
export class PersonalCreditComponent implements OnInit, AfterViewInit {
  requestForm: FormGroup = new FormGroup({
    amount: new FormControl(100000, [Validators.required]),
    term: new FormControl(null, [Validators.required])
  });
  disbursementForm: FormGroup = new FormGroup({
    account: new FormControl(null, [Validators.required])
  });
  confirmForm: FormGroup = new FormGroup({});
  accessToPersonalCredit = false;
  cardLimit: number;
  stepperIndex = 0;
  disableButton = true;
  buttonText = 'Continuar';
  done = false;
  title: string;
  message: string;
  status: 'success' | 'warn' | 'error';
  responseComponentType: 'success' | 'warning' | 'error';
  @ViewChild('personalCreditStepper') stepper: CdkStepper;

  constructor(private personalCreditService: PersonalCreditService,
              private channelsApiService: ChannelsApiService,
              private modalService: ModalService,
              private toastService: CredixToastService,
              private storageService: StorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAccountSummary();
  }

  ngAfterViewInit(): void {
    this.setEnableButton();
  }

  getAccountSummary() {
    this.channelsApiService
      .getAccountSummary(this.storageService.getCurrentCards().find(card => card.category === 'Principal').cardId)
      .pipe(finalize(() => this.done = !this.accessToPersonalCredit))
      .subscribe(accountSummary => {
        this.accessToPersonalCredit = ConvertStringAmountToNumber(accountSummary.available) >= 100000;
        this.cardLimit = ConvertStringAmountToNumber(accountSummary.limit);
      });
  }

  setEnableButton() {
    switch (this.stepperIndex) {
      case 0 :
        this.disableButton = this.requestForm.invalid;
        this.requestForm.valueChanges.subscribe(value => {
          this.disableButton = this.requestForm.invalid;
        });
        break;
      case 1:
        this.disableButton = this.disbursementForm.invalid;
        this.disbursementForm.valueChanges.subscribe(value => {
          this.disableButton = this.requestForm.invalid && this.disbursementForm.invalid;
        });
        break;
      case 2:
        this.disableButton = this.confirmForm.invalid;
        this.confirmForm.valueChanges.subscribe(value => {
          this.disableButton = this.requestForm.invalid && this.disbursementForm.invalid && this.confirmForm.invalid;
        });
        break;
    }
  }

  next() {
    switch (this.stepper.selectedIndex) {
      case 0 :
        this.stepper.next();
        this.stepperIndex++;
        break;
      case 1:
        if (this.disbursementForm.controls.account.value !== 0) {
          this.personalCreditService.checkIbanColonesAccount(this.disbursementForm.controls.account.value).subscribe(response => {
            if (response.type === 'success' && response.message.MotivoRechazo === '0') {
              this.stepper.next();
              this.stepperIndex++;
            } else {
              this.personalCreditService.emitErrorIbanAccount();
              console.log(response);
            }
          });
        } else {
          this.stepper.next();
          this.stepperIndex++;
        }
        break;
      case 2:
        this.modalService.confirmationPopup('¿Desea solicitar este crédito personal?', null, 380, 203)
          .subscribe(response => response && this.submit());
        break;
    }

    this.setButtonLabel();
    this.setEnableButton();
  }

  back() {
    this.stepper.previous();
    this.stepperIndex--;
    this.setButtonLabel();
    this.setEnableButton();
  }

  setButtonLabel() {
    if (this.stepper.selectedIndex === 2) {
      this.buttonText = 'Solicitar';
    } else {
      this.buttonText = 'Continuar';
    }
  }

  submit() {
    this.personalCreditService.savePersonalCredit({
      amount: this.requestForm.controls.amount.value.toString(),
      commission: ConvertStringAmountToNumber(this.personalCreditService.personalCreditSummary.commission).toString(),
      quota: ConvertStringAmountToNumber(this.personalCreditService.personalCreditSummary.quota).toString(),
      term: this.requestForm.controls.term.value.toString(),
      method: this.disbursementForm.controls.account.value === 0 ? 'Cheque' : 'Transferencia',
      bankAccount: this.disbursementForm.controls.account.value.toString(),
      total: ConvertStringAmountToNumber(this.personalCreditService.personalCreditSummary.totalPay).toString(),
      ads: 'Revista Digital',
      otherAds: 'No aplica',
      commissionRate: this.personalCreditService.personalCreditSummary.percentageCommission.toString(),
      customerType: '2',
      ticketTypeId: '5'
    })
      .pipe(finalize(() => this.done = true))
      .subscribe(response => {
        this.status = response.type;
        this.message = response.message;
        switch (this.status) {
          case 'success':
            this.title = '¡Éxito!';
            this.responseComponentType = 'success';
            break;
          case 'warn':
            this.title = 'Solicitud en estudio';
            this.responseComponentType = 'warning';
            break;
          case 'error':
            this.title = 'Oops…';
            this.responseComponentType = 'error';
            break;
        }
      });
  }
}
