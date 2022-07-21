import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CdkStepper} from '@angular/cdk/stepper';
import {SendMoneyService} from './send-money.service';
import {ModalService} from '../../../../core/services/modal.service';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {CredixToastService} from '../../../../core/services/credix-toast.service';
import {TagsService} from '../../../../core/services/tags.service';
import {Tag} from '../../../../shared/models/tag';
import {ConvertStringAmountToNumber} from '../../../../shared/utils';
import {finalize} from 'rxjs/operators';
import {AccountApiService} from '../../../../core/services/account-api.service';
import {CredixCodeErrorService} from '../../../../core/services/credix-code-error.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  styleUrls: ['./send-money.component.scss'],
  providers: [DatePipe],
})
export class SendMoneyComponent implements OnInit, AfterViewInit, OnDestroy {
  informationForm: FormGroup = new FormGroup({
    account: new FormControl(23213, [Validators.required]),
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
  done = false;
  message: string;
  status: 'success' | 'error';
  title: string;
  currencyPrefix: string;
  commissionRate: number;
  commission: number;
  total: number;
  ibanOrigin: string;
  todayString: string;
  typeDestination: number;
  step: string;
  step2: string;
  step3: string;
  @ViewChild('sendMoneyStepper') stepper: CdkStepper;

  constructor(private sendMoneyService: SendMoneyService,
              private credixCodeErrorService: CredixCodeErrorService,
              private accountApiService: AccountApiService,
              private modalService: ModalService,
              public toastService: CredixToastService,
              private tagsService: TagsService,
              private router: Router,
              private datePipe: DatePipe) {
    this.todayString = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.getIbanAccount();
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Enviar dinero').tags));
    this.credixCodeErrorService.credixCodeError$.subscribe(() => {
      this.confirmForm.controls.code.setErrors({invalid: true});
      this.confirmForm.updateValueAndValidity();
    });
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
    this.accountApiService.getIbanAccounts().subscribe((ibanAccounts) => {
      if (ibanAccounts.length > 0) {
        this.ibanOrigin = ibanAccounts[0].ibanAccountNumber;
      }
    });
  }

  openConfirmationModal() {
    this.modalService.confirmationPopup('¿Desea realizar esta transferencia?')
      .subscribe(confirmation => {
        if (confirmation) {
          if (this.informationForm.controls.account.value.favName) {
            this.saveNewAccount();
          }
          this.sendMoney();
        } else {
          this.selectedIndex = 2;
        }
      });
  }

  sendMoney() {
    this.sendMoneyService.sendMoney(
      this.ibanOrigin.trim(),
      this.currencyPrefix === '$' ? 840 : 188,
      this.todayString,
      ConvertStringAmountToNumber(this.amountAndQuotaForm.controls.amount.value),
      this.informationForm.controls.account.value.ibanAccount.trim(),
      this.typeDestination,
      !this.informationForm.controls.account.value.aliasName ? 'Temporal' : this.informationForm.controls.account.value.aliasName.trim(),
      this.amountAndQuotaForm.controls.quotas.value.toString(),
      this.commission,
      this.total,
      this.informationForm.controls.account.value.identification,
      this.confirmForm.controls.code.value
    ).pipe(finalize(() => this.done = this.confirmForm.controls.code.valid))
      .subscribe(result => {
        this.title = result?.title ? result.title : 'Oops...';
        this.status = result.type;
        this.message = result?.message ? result.message : 'Ocurrió un error. Favor volver a intentar';
        if (result.type !== 'success') {
          this.selectedIndex = 2;
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

  getTags(tags: Tag[]) {
    this.step = tags.find(tag => tag.description === 'enviardinero.stepper1')?.value;
    this.step2 = tags.find(tag => tag.description === 'enviardinero.stepper2')?.value;
    this.step3 = tags.find(tag => tag.description === 'enviardinero.stepper3')?.value;
  }

  ngOnDestroy(): void {
    this.sendMoneyService.unsubscribe();
  }
}
