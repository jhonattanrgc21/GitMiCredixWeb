import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FavoritesManagementService} from '../favorites-management.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AutomaticsService} from './automatics.service';
import {ModalService} from '../../../../../core/services/modal.service';
import {DatePipe} from '@angular/common';
import {CredixToastService} from '../../../../../core/services/credix-toast.service';
import {SchedulePayments} from '../../../../../shared/models/schedule-payments';
import {CredixCodeErrorService} from '../../../../../core/services/credix-code-error.service';
import {ActivatedRoute} from '@angular/router';
import {Periodicity} from '../../../../../shared/models/periodicity';
import { PaymentQuota } from 'src/app/shared/models/payment-quota';
import { finalize } from 'rxjs/operators';
import { ConvertStringAmountToNumber } from 'src/app/shared/utils';
import { PublicServicesApiService } from 'src/app/core/services/public-services-api.service';
import { CredixSliderComponent } from 'src/app/shared/components/credix-slider/credix-slider.component';

@Component({
  selector: 'app-automatics',
  templateUrl: './automatics.component.html',
  styleUrls: ['./automatics.component.scss']
})
export class AutomaticsComponent implements OnInit, AfterViewInit {
  automaticsDetailForm: FormGroup = new FormGroup({
    favoriteName: new FormControl(null, Validators.required),
    maxAmount: new FormControl(null, Validators.required),
    startDate: new FormControl(null, Validators.required),
    periodicity: new FormControl(null, Validators.required),
    codeCredix: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });
  rechargeFormGroup: FormGroup = new FormGroup({
    amount: new FormControl(null, [Validators.nullValidator]),
  });
  codeCredix: FormControl = new FormControl(null, [Validators.required, Validators.minLength(6)]);
  data: SchedulePayments;
  periodicityList: Periodicity[];
  idParam: number;
  today: Date;
  deleted = false;
  amounts = [];

  amount: string;
  isActive = false;
  quoteTag: string;
  termTag: string;
  amountTag: string;
  subtitleAmountTag: string;
  monthTag: string;
  popupAmountTag: string;
  popupTitleTag: string;
  popupIvaTag: string;
  popupSecureTag: string;
  popupInterestTag: string;
  popupCommissionTag: string;
  popupDisclaimerTag: string;
  popupTotalTag: string;

  quotas: PaymentQuota[] = [];
  paymentQuotaSummary: PaymentQuota = null;
  amountSliderStep = 1;
  amountSliderMin = 0;
  amountSliderMax = 1;
  termSliderStep = 2;
  termSliderMin = 1;
  termSliderMax = 12;
  termSliderDisplayMin = 1;
  termSliderDisplayMax = 12;
  termSliderDisplayValue = 7;
  anotherAmount: boolean = false;
  publicServiceCategory;
  isChanged = true;

  constructor(private favoritesManagementService: FavoritesManagementService,
              private automaticsService: AutomaticsService,
              private modalService: ModalService,
              public datePipe: DatePipe,
              private toastService: CredixToastService,
              private credixCodeErrorService: CredixCodeErrorService,
              private route: ActivatedRoute,
              private favoriteMagamentService: FavoritesManagementService,
              private publicServiceApi: PublicServicesApiService,) {
  }

  get automaticsDetailControls() {
    return this.automaticsDetailForm.controls;
  }

  ngOnInit(): void {
    this.idParam = +this.route.snapshot.params?.id;
    this.getSchedulePayment();
    this.getCredixCodeError();
    this.onMaxAmount();
    this.getAmountsRecharge();
  }

  ngAfterViewInit() {
    this.getUpdateAlert();
    this.getDeletedSuccess();
    this.scheduleDetailFormChanged();
  }

  getSchedulePayment() {
    this.favoritesManagementService.schedulePayments.subscribe((response) => {
      this.automaticsDetailForm.controls.codeCredix.reset(null, {emitEvent: false});
      this.data = response;
      console.log("Data: ", this.data);
      this.deleted = false;
      this.automaticsDetailForm.controls.favoriteName.setValue(this.data?.alias, {onlySelf: false, emitEvent: false});
      this.automaticsDetailForm.controls.maxAmount.setValue(this.data?.maxAmount, {onlySelf: false, emitEvent: false});
      this.automaticsDetailForm.controls.startDate.setValue(this.data?.startDate, {onlySelf: false, emitEvent: false});
      this.automaticsDetailForm.markAsPristine();
      this.automaticsDetailControls.periodicity.markAsUntouched({onlySelf: true});
      this.today = new Date(this.data?.startDate);
      this.getQuotas( this.automaticsDetailForm.controls.maxAmount.value );
      this.getPeriodicityList();
      this.getCategoryServices();
    });
  }

  getPeriodicityList() {
    this.automaticsService.getPeriodicity().subscribe((response) => {
      this.periodicityList = response;
      this.automaticsDetailForm.controls.periodicity
        .setValue(this.periodicityList?.find(elem => elem.description === this.data.periodicityDescription).id,
          {onlySelf: false, emitEvent: false});
    });
  }

  getUpdateAlert() {
    const date: Date = new Date(this.automaticsDetailControls.startDate.value);
    this.favoritesManagementService.confirmUpdate.subscribe((response) => {
      if (response.confirm && this.data.id) {
        this.setUpdateSchedule(
          this.automaticsDetailControls.periodicity.value,
          this.datePipe.transform(date.toISOString(), 'yyyy-MM-dd'),
          this.automaticsDetailControls.maxAmount.value,
          this.data.id,
          this.automaticsDetailControls.codeCredix.value);
      }
    });
  }

  setUpdateSchedule(periodId: number, date: string, mxAmount: number, id: number, codeCredix: string) {
    this.automaticsService.setUpdateAutomatics(periodId, date, mxAmount, id, codeCredix)
      .subscribe((response) => {
        this.automaticsDetailControls.codeCredix.reset(null, {onlySelf: false, emitEvent: false});
        if (response.type === 'success') {
          this.favoritesManagementService.emitUpdateSuccessAlert();
        }
      });
  }

  scheduleDetailFormChanged() {
    this.automaticsDetailForm.valueChanges
      .subscribe(() => {
        /*if (this.automaticsDetailControls.favoriteName.dirty ||
          this.automaticsDetailControls.maxAmount.dirty ||
          this.automaticsDetailControls.startDate.dirty ||
          this.automaticsDetailControls.periodicity.touched) {
          this.favoritesManagementService.updating(true);
        } else {
          this.favoritesManagementService.updating(false);

        }*/
        console.log("form: ", this.automaticsDetailForm);
        this.automaticsDetailForm.status === 'VALID' ? this.favoritesManagementService.updating(true) : this.favoritesManagementService.updating(false);

      });
  }

  getCredixCodeError() {
    this.credixCodeErrorService.credixCodeError$.subscribe(() => {
      this.automaticsDetailControls.codeCredix.setErrors({invalid: true});
      this.automaticsDetailForm.updateValueAndValidity();
    });
  }

  getDeletedSuccess() {
    this.favoritesManagementService.deleted.subscribe((response) => {
      this.deleted = response.automatics;
    });
  }

  getQuotas(amount) {
    this.favoriteMagamentService.getCuotaCalculator( amount )
      .pipe(finalize(() => this.selectPaymentQuotaSummary()))
        .subscribe(
          response => {
            if ( response ) {
              this.quotas = response.sort((a, b) => a.quotaTo - b.quotaTo);
              this.termSliderDisplayMin = this.quotas[0].quotaTo;
              this.termSliderMin = 1;
              this.termSliderDisplayMax = this.quotas[this.quotas.length - 1].quotaTo;
              this.termSliderMax = this.quotas.length;
              this.termSliderDisplayValue = this.termSliderDisplayMin;
              this.termSliderStep = 2;
              this.termSliderStep = 1;
            }
          },
        );
  }

  selectPaymentQuotaSummary() {
    this.paymentQuotaSummary = this.quotas.find(value => value.quotaTo === this.termSliderDisplayValue);
    //this.ivaAmount = Number((ConvertStringAmountToNumber(this.personalCreditSummary.commission) * 0.13).toFixed(2));
  }

  getQuota(sliderValue) {
    this.termSliderDisplayValue = this.quotas[sliderValue - 1].quotaTo;
    //this.termControl.setValue( this.termSliderDisplayValue );
    this.selectPaymentQuotaSummary();
  }

  onMaxAmount() {
    this.automaticsDetailForm.controls.maxAmount.valueChanges.subscribe(value => {
      this.getQuotas( value );
    });
  }

  getAmountsRecharge() {
    this.favoritesManagementService.getAmountRecharge()
      .subscribe(response => {
        response.forEach((value, index) => {
          this.amounts.push({
            amount: value,
            id: index + 1
          });
        });
        this.amounts.push({
          amount: 'Otro',
          id: this.amounts.length + 1
        });
      });
  }

  onAmountChanged(value) {
    if (value !== 'Otro') {
      this.anotherAmount = false;
      this.rechargeFormGroup.controls.amount.setValidators([Validators.required]);
      this.rechargeFormGroup.controls.amount.setValue(ConvertStringAmountToNumber(value).toString());
    } else {
      this.rechargeFormGroup.controls.amount.reset();
      this.rechargeFormGroup.controls.amount.setValidators([Validators.required,
        Validators.min(ConvertStringAmountToNumber(this.amounts[0].amount))]);
      this.anotherAmount = true;
    }
    this.rechargeFormGroup.controls.amount.updateValueAndValidity();
  }

  convertAmount(amount) {
    return ConvertStringAmountToNumber( amount );
  }

  getCategoryServices() {
    this.publicServiceApi.getPublicServiceCategories()
      .subscribe((response) => {
        this.publicServiceCategory = response.find(category => category.publicServiceCategoryId === this.data.publicServiceCategoryId)?.publicServiceCategory;
        if ( this.publicServiceCategory === 'Recargas' ) {
          this.rechargeFormGroup.controls.amount.valueChanges.subscribe(value => {
            /*this.automaticsDetailForm.patchValue({
              maxAmount: value
            });*/
            this.automaticsDetailForm.controls.maxAmount.setValue(value, {onlySelf: false, emitEvent: false});

          });
        } else {
          this.publicServiceCategory = 'Servicio';
        }
        console.log("public: ", this.publicServiceCategory);     
      });
  }
}

