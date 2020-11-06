import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CdkStepper} from '@angular/cdk/stepper';
import {PersonalCreditService} from './personal-credit.service';
import {ConvertStringAmountToNumber} from '../../../../shared/utils';
import {ModalService} from '../../../../core/services/modal.service';
import {CredixToastService} from '../../../../core/services/credix-toast.service';
import {StorageService} from '../../../../core/services/storage.service';
import {finalize} from 'rxjs/operators';
import {ChannelsApiService} from '../../../../core/services/channels-api.service';
import {TagsService} from '../../../../core/services/tags.service';
import {Tag} from '../../../../shared/models/tag';

@Component({
  selector: 'app-personal-credit',
  templateUrl: './personal-credit.component.html',
  styleUrls: ['./personal-credit.component.scss']
})
export class PersonalCreditComponent implements OnInit, AfterViewInit, OnDestroy {
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
  titleTag: string;
  stepsTagsTitles: {
    firstStepTagTitle: string;
    secondStepTagTitle: string;
    thirstyStepTagTitle: string
  };
  stepOneTags: { plazoTag: string; amountTag: string; subtitleAmountTag: string; monthTag: string; };
  stepTwoTags: {
    option1Tag: string;
    option2Tag: string;
    secondStepOption1Tag: string;
    secondStepOption2Tag1: string;
    secondStepOption2Tag2: string;
    secondStepOption2Tag3: string;
    subtitle: string;
  };
  stepThreeTags: {
    ibanTag: string;
    tagCheque: string;
    subtitleTag1: string;
    amountTag: string;
    subtitleTag2: string;
    quotesTag: string;
    totalTag: string;
    plazoTag: string;
  };
  subtitleTag: string;
  quoteTags: string;
  popUpTags: {
    amountTag: string;
    titleTag: string;
    tagIva: string;
    secureTag: string;
    disclaimerTag: string;
    interesTag: string;
    commissionTag: string;
    totalTag: string;
  };
  questionTag: string;
  warningMessageTag: string;
  warningMessageDescription: string;
  done = false;
  title: string;
  message: string;
  status: 'success' | 'warn' | 'error' | 'info';
  responseComponentType: 'success' | 'warn' | 'error' | 'info';
  @ViewChild('personalCreditStepper') stepper: CdkStepper;

  constructor(private personalCreditService: PersonalCreditService,
              private channelsApiService: ChannelsApiService,
              private modalService: ModalService,
              private toastService: CredixToastService,
              private storageService: StorageService,
              private tagsService: TagsService) {
  }

  ngOnInit(): void {
    this.getAccountSummary();
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Crédito personal').tags)
    );

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
        break;
      case 1:
        if (this.disbursementForm.controls.account.value !== 0) {
          this.personalCreditService.checkIbanColonesAccount(this.disbursementForm.controls.account.value).subscribe(response => {
            if (response.type === 'success' && response.message.MotivoRechazo === '0') {
              this.stepper.next();
            } else {
              this.personalCreditService.emitErrorIbanAccount();
            }
          });
        } else {
          this.stepper.next();
        }
        break;
      case 2:
        this.modalService.confirmationPopup('¿Desea solicitar este crédito personal?', null, 380, 203)
          .subscribe(response => response && this.submit());
        break;
    }
    this.stepperIndex = this.stepper.selectedIndex;
    this.setEnableButton();
  }

  back() {
    this.stepper.previous();
    this.stepperIndex = this.stepper.selectedIndex;
    this.setEnableButton();
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
      .pipe(finalize(() => this.done = this.status?.length > 0))
      .subscribe(response => {
        this.status = response.type;
        this.message = response.message;
        this.responseComponentType = this.status;
        switch (this.status) {
          case 'success':
            this.title = '¡Éxito!';
            break;
          case 'warn':
            this.title = 'Solicitud en estudio';
            break;
          case 'error':
            this.title = 'Oops…';
            break;
        }
      });
  }

  getTags(tags: Tag[]) {
    this.titleTag = tags.find(tag => tag.description === 'credito.title')?.value;
    this.stepsTagsTitles = {
      firstStepTagTitle: tags.find(tag => tag.description === 'credito.stepper1')?.value,
      secondStepTagTitle: tags.find(tag => tag.description === 'credito.stepper2')?.value,
      thirstyStepTagTitle: tags.find(tag => tag.description === 'credito.stepper3')?.value
    };
    this.stepOneTags = {
      plazoTag: tags.find(tag => tag.description === 'credito.stepper1.subtitle.plazo')?.value,
      amountTag: tags.find(tag => tag.description === 'credito.stepper1.tag.monto')?.value,
      subtitleAmountTag: tags.find(tag => tag.description === 'credito.stepper1.subtitle.monto')?.value,
      monthTag: tags.find(tag => tag.description === 'credito.stepper1.tag.meses')?.value
    };

    this.stepTwoTags = {
      option1Tag: tags.find(tag => tag.description === 'credito.stepper2.option1')?.value,
      option2Tag: tags.find(tag => tag.description === 'credito.stepper2.option2')?.value,
      secondStepOption1Tag: tags.find(tag => tag.description === 'credito.stepper2.option1.tag')?.value,
      secondStepOption2Tag1: tags.find(tag => tag.description === 'credito.stepper2.option2.tag1')?.value,
      secondStepOption2Tag2: tags.find(tag => tag.description === 'credito.stepper2.option2.tag2')?.value,
      secondStepOption2Tag3: tags.find(tag => tag.description === 'credito.stepper2.option2.tag3')?.value,
      subtitle: tags.find(tag => tag.description === 'credito.stepper2.subtitle')?.value
    };

    this.stepThreeTags = {
      ibanTag: tags.find(tag => tag.description === 'credito.stepper3.iban')?.value,
      tagCheque: tags.find(tag => tag.description === 'credito.stepper3.tagcheque')?.value,
      amountTag: tags.find(tag => tag.description === 'credito.stepper3.monto')?.value,
      plazoTag: tags.find(tag => tag.description === 'credito.stepper3.plazo')?.value,
      quotesTag: tags.find(tag => tag.description === 'credito.stepper3.cuota')?.value,
      totalTag: tags.find(tag => tag.description === 'credito.stepper3.total')?.value,
      subtitleTag1: tags.find(tag => tag.description === 'credito.stepper3.subtitle1')?.value,
      subtitleTag2: tags.find(tag => tag.description === 'credito.stepper3.subtitle2')?.value
    };

    this.popUpTags = {
      amountTag: tags.find(tag => tag.description === 'credito.popup.tag.monto')?.value,
      titleTag: tags.find(tag => tag.description === 'credito.popup.title')?.value,
      tagIva: tags.find(tag => tag.description === 'credito.popup.tagIVA')?.value,
      secureTag: tags.find(tag => tag.description === 'credito.popup.tag.seguro')?.value,
      interesTag: tags.find(tag => tag.description === 'credito.popup.tag.interes')?.value,
      commissionTag: tags.find(tag => tag.description === 'credito.popup.tag.comision')?.value,
      disclaimerTag: tags.find(tag => tag.description === 'credito.popup.tag.disclaimer')?.value,
      totalTag: tags.find(tag => tag.description === 'credito.popup.tag.total')?.value,
    };

    this.questionTag = tags.find(tag => tag.description === 'credito.question')?.value;
    this.warningMessageTag = tags.find(tag => tag.description === 'credito.message.warning.title')?.value;
    this.warningMessageDescription = tags.find(tag => tag.description === 'credito.message.warning.description')?.value;
    this.quoteTags = tags.find(tag => tag.description === 'credito.tag.cuotas')?.value;
    this.subtitleTag = tags.find(tag => tag.description === 'credito.tag.cuotas')?.value;
  }

  ngOnDestroy(): void {
    this.personalCreditService.unsubscribe();
  }
}
