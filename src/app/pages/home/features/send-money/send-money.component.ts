import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CdkStepper} from '@angular/cdk/stepper';
import {SendMoneyService} from './send-money.service';
import {ModalService} from '../../../../core/services/modal.service';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {CredixToastService} from '../../../../core/services/credix-toast.service';
import {GlobalRequestsService} from '../../../../core/services/global-requests.service';

@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  styleUrls: ['./send-money.component.scss'],
  providers: [DatePipe],
})
export class SendMoneyComponent implements OnInit, AfterViewInit {
  informationForm: FormGroup = new FormGroup({
    account: new FormControl(null, [Validators.required]),
  });
  amountAndQuotaForm: FormGroup = new FormGroup({
    amount: new FormControl(null, [Validators.required]),
    quotas: new FormControl(3, [Validators.required]),
    detail: new FormControl(null, []),
  });
  confirmForm: FormGroup = new FormGroup({
    code: new FormControl(null, [Validators.required]),
  });
  selectedIndex = 0;
  disableButton = true;
  currencyPrefix: string;
  commissionRate: number;
  commission: number;
  total: number;
  ibanOrigin: string;
  todayString: string;
  done = false;
  typeDestination: number;

  @ViewChild('sendMoneyStepper') stepper: CdkStepper;

  constructor(
    private sendMoneyService: SendMoneyService,
    private modalService: ModalService,
    private router: Router,
    private datePipe: DatePipe,
    public toastService: CredixToastService,
    public globalService: GlobalRequestsService
  ) {
    this.todayString = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.getIbanAccount();
  }

  ngAfterViewInit(): void {
    this.setEnableButton();
  }

  setEnableButton() {
    switch (this.selectedIndex) {
      case 0:
        this.disableButton = this.informationForm.invalid;
        this.informationForm.valueChanges.subscribe(() => {
          this.disableButton = this.informationForm.invalid;
        });
        break;
      case 1:
        this.disableButton = this.amountAndQuotaForm.invalid;
        this.amountAndQuotaForm.valueChanges.subscribe(() => {
          this.disableButton = this.amountAndQuotaForm.invalid;
        });
        break;
      case 2:
        this.disableButton = this.confirmForm.invalid;
        this.confirmForm.valueChanges.subscribe(() => {
          this.disableButton = this.confirmForm.invalid;
        });
        break;
    }
  }

  next() {
    if (this.selectedIndex < 3) {
      this.stepper.next();
      this.selectedIndex++;
    }

    if (this.selectedIndex === 2) {
      this.confirmForm.controls.code.reset(null, [Validators.required]);
    }

    if (this.selectedIndex === 3) {
      this.openConfirmationModal();
    }

    this.setEnableButton();
  }

  back() {
    this.selectedIndex--;
    this.stepper.previous();
    this.setEnableButton();
  }

  getIbanAccount() {
    this.globalService.getIbanAccounts().subscribe((ibanAccounts) => {
      if (ibanAccounts.length > 0) {
        this.ibanOrigin = ibanAccounts[0].ibanAccountNumber;
      }
    });
  }

  sendMoney() {
    this.sendMoneyService
      .sendMoney(
        this.ibanOrigin,
        this.currencyPrefix === '$' ? 840 : 188,
        this.todayString,
        this.amountAndQuotaForm.controls.amount.value,
        this.informationForm.controls.account.value.ibanAccount,
        this.typeDestination,
        this.informationForm.controls.account.value.aliasName,
        this.amountAndQuotaForm.controls.quotas.value,
        this.commission,
        this.total,
        this.informationForm.controls.account.value.identification,
        this.confirmForm.controls.code.value
      )
      .subscribe((res) => {
        const text = res.message;
        const type = res.type;
        this.toastService.show({text, type});
        if (res.type === 'success') {
          this.done = true;
        }
      });
  }

  saveNewAccount() {
    this.sendMoneyService.addFavAccount(
      this.informationForm.controls.account.value.favName,
      this.informationForm.controls.account.value.ibanAccount,
      this.informationForm.controls.account.value.identType,
      this.informationForm.controls.account.value.identification,
      this.confirmForm.controls.code.value
    ).subscribe((res) => {
      const text = res.message;
      const type = res.type;
      this.toastService.show({text, type});
    });
  }

  openConfirmationModal() {
    this.modalService
      .confirmationPopup('¿Desea realizar esta transferencia?')
      .subscribe((res) => {
        if (res) {
          if (this.informationForm.controls.account.value.favName) {
            this.saveNewAccount();
          }
          this.sendMoney();

        } else {
          this.selectedIndex = 2;
        }
      });
  }

  goHome() {
    this.router.navigate(['/home']).then();
  }
}
