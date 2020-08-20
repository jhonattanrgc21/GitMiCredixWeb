import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CdkStepper} from '@angular/cdk/stepper';
import {PersonalCreditService} from './personal-credit.service';
import {GlobalRequestsService} from '../../../../core/services/global-requests.service';
import {ConvertStringAmountToNumber} from '../../../../shared/utils';
import {ModalService} from '../../../../core/services/modal.service';
import {Router} from '@angular/router';
import {CredixToastService} from '../../../../core/services/credix-toast.service';

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
  selectedIndex = 0;
  disableButton = true;
  buttonText = 'Continuar';
  showCreditRequestResponse = false;
  responseTitle: string;
  responseMessage: string;
  responseType: 'success' | 'warn' | 'error';
  responseComponentType: 'success' | 'warning' | 'error';
  @ViewChild('personalCreditStepper') stepper: CdkStepper;

  constructor(private personalCreditService: PersonalCreditService,
              private globalRequestsService: GlobalRequestsService,
              private modalService: ModalService,
              private toastService: CredixToastService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAccountSummary();
  }

  ngAfterViewInit(): void {
    this.setEnableButton();
  }

  getAccountSummary() {
    this.globalRequestsService.getAccountSummary().subscribe(response => {
      this.accessToPersonalCredit = ConvertStringAmountToNumber(response.available) >= 100000;
      this.cardLimit = ConvertStringAmountToNumber(response.limit);
    });
  }

  setEnableButton() {
    switch (this.selectedIndex) {
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
        this.selectedIndex++;
        break;
      case 1:
        if (this.disbursementForm.controls.account.value !== 0) {
          this.personalCreditService.checkIbanColonesAccount(this.disbursementForm.controls.account.value).subscribe(response => {
            if (response.type === 'success' && response.message.MotivoRechazo === '0') {
              this.stepper.next();
              this.selectedIndex++;
            } else {
              this.toastService.show({text: 'Cuenta incorrecta', type: 'error'});
            }
          });
        } else {
          this.stepper.next();
          this.selectedIndex++;
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
    this.selectedIndex--;
    this.setButtonLabel();
    this.setEnableButton();
  }

  goHome() {
    this.router.navigate(['/home']);
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
      commission: this.personalCreditService.personalCreditSummary.commission,
      quota: this.personalCreditService.personalCreditSummary.quota,
      term: this.requestForm.controls.term.value,
      method: this.disbursementForm.controls.account.value === 0 ? 'Cheque' : 'Transferencia',
      bankAccount: this.disbursementForm.controls.account.value.toString(),
      total: this.personalCreditService.personalCreditSummary.totalPay,
      ads: 'Revista Digital',
      otherAds: 'No aplica',
      commissionRate: this.personalCreditService.personalCreditSummary.percentageCommission.toString(),
      customerType: '2',
      ticketTypeId: '5'
    })
      .subscribe(response => {
        this.responseType = response.type;
        this.responseMessage = response.message;
        switch (this.responseType) {
          case 'success':
            this.responseTitle = '¡Éxito!';
            this.responseComponentType = 'success';
            break;
          case 'warn':
            this.responseTitle = 'Solicitud en estudio';
            this.responseComponentType = 'warning';
            break;
          case 'error':
            this.responseTitle = 'Oops…';
            this.responseComponentType = 'error';
            break;
        }
        this.showCreditRequestResponse = true;
      });
  }
}
