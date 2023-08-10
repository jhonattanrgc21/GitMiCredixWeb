import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ExtendTermTotalOwedApiService } from 'src/app/core/services/extend-term-total-owed-api.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { TagsService } from 'src/app/core/services/tags.service';
import { PaymentQuota } from 'src/app/shared/models/payment-quota';
import { Tag } from 'src/app/shared/models/tag';
import { ConvertStringAmountToNumber } from 'src/app/shared/utils';
import { ConvertNumberToStringAmount } from 'src/app/shared/utils/convert-number-to-string-amount';

@Component({
  selector: 'app-extend-term-total-owed',
  templateUrl: './extend-term-total-owed.component.html',
  styleUrls: ['./extend-term-total-owed.component.scss']
})
export class ExtendTermTotalOwedComponent implements OnInit {

  comissionTag: string;
  subtitleTag: string;
  disclaTag: string;
  dateTag: string;
  quotaTag: string;
  deseoTag: string;
  newQuota: string;
  resultNew: string;

  amountSliderStep = 1;
  amountSliderMin = 0;
  amountSliderMax = 1;
  termSliderStep = 1;
  termSliderMin = 1;
  termSliderMax = 12;
  termSliderDisplayMin = 1;
  termSliderDisplayMax = 12;
  termSliderDisplayValue = 0;
  movementsSelected: number[];
  quotas: PaymentQuota[];
  extendQuotaSummary: PaymentQuota = null;
  purchaseAmount: string = '';
  minimumPayment: string = '';
  pendingPayment: string = '';
  hasMinimumPayment: boolean = false;
  message: string = '';
  title: string = '';
  template: TemplateRef<any>;
  done: boolean = false;
  isEmpty: boolean = false;
  commissionMonthly: string = '';

  @ViewChild('summaryTemplate') summaryTemplate: TemplateRef<any>;
  @ViewChild('disabledTemplate') disabledTemplate: TemplateRef<any>;


  constructor(
    private modalService: ModalService,
    private extendTermTotalOwedService: ExtendTermTotalOwedApiService,
    private tagsService: TagsService,
    private router: Router,
    private storage: StorageService
  ) { }

  ngOnInit(): void {
    this.checkCutDate();
    console.log("actID: ", this.storage.getCurrentUser().actId),
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Ampliar plazo de compra').tags));
    this.getQuotas();
  }

  checkCutDate() {
    this.extendTermTotalOwedService.checkCutDate().subscribe(response => {
      if (!response.status) {
        this.message = 'Para ampliar el plazo de su total adeudado debe realizarlo 3 días antes de su fecha de corte.';
        this.title = response.titleOne;
        this.template = this.disabledTemplate;
        this.isEmpty = true;
      }
    });
  }

  getQuotas() {
    this.extendTermTotalOwedService.getQuotasPreviousMovement( this.movementsSelected, 2004 )
      .pipe(finalize(() => this.selectExtendQuotaSummary()))
        .subscribe(
          response => {
            if ( response?.listQuota ) {
              this.purchaseAmount = response.purchaseAmount;
              this.minimumPayment = response.minimumPayment;
              this.pendingPayment = response.purchaseAmount;
              this.hasMinimumPayment = ConvertStringAmountToNumber( this.minimumPayment ) <= 0 ? false: true;
              this.pendingPayment =  ConvertNumberToStringAmount( ( ConvertStringAmountToNumber( this.purchaseAmount ) - ConvertStringAmountToNumber( this.minimumPayment ) ) );
              this.quotas = response.listQuota.sort((a, b) => a.quotaTo - b.quotaTo);
              this.termSliderDisplayMin = this.quotas[0].quotaTo;
              this.termSliderMin = 1;
              this.termSliderDisplayMax = this.quotas[this.quotas.length - 1].quotaTo;
              this.termSliderMax = this.quotas.length;
              this.termSliderDisplayValue = this.termSliderDisplayMin;
            } else {
              const message = 'En este momento su cuenta no aplica para este producto.';
              
              this.extendTermTotalOwedService.result = {
                status: 'error',
                message,
              };

              this.router.navigate([`/home/extend-term-total-debt/extend-term-total-notification-success`]);
            }
          }
        );
  }

  getQuota(sliderValue) {
    this.termSliderDisplayValue = this.quotas[sliderValue - 1].quotaTo;
    this.selectExtendQuotaSummary();
  }

  selectExtendQuotaSummary() {
    this.extendQuotaSummary = this.quotas.find(value => value.quotaTo === this.termSliderDisplayValue);
    this.extendQuotaSummary.feeAmount = this.extendQuotaSummary?.feeAmount.replace('.', ',')
    if(this.extendQuotaSummary?.isCommissionMonthly){
      this.commissionMonthly = 'mensual';
    }
    else{
      this.commissionMonthly = '';
    }
  }

  saveQuota() {
    if ( !this.hasMinimumPayment ) {
      this.extendTermTotalOwedService.saveExtendTotalDebit(
        this.extendQuotaSummary.quotaTo,
        2004)
        .pipe(finalize(() => this.router.navigate([`/home/extend-term-total-debt/extend-term-total-notification-success`])))
          .subscribe(response => {
            const message = response.title === 'success' ? 'El plazo de su total adeudado ha sido extendido correctamente. Estará reflejado en su próximo estado de cuenta. Le estaremos enviando un correo con los detalles del producto próximamente.'
                                                        : 'Ocurrió un error. Favor vuelva a intentar.';
            this.extendTermTotalOwedService.result = {
              status: response.title,
              message,
            };
  
            this.extendTermTotalOwedService.newQuota = {
              currency: '₡',
              amount: this.extendQuotaSummary.amountPerQuota,
              quota: this.extendQuotaSummary.quotaTo,
            };
          });
    }
    }
    

  openSummary() {
    this.modalService.open({
      template: this.summaryTemplate,
      title: 'Resumen general',
    },
    {width: 380, height: 443, disableClose: true, panelClass: 'summary-panel'}
    )
  }

  redirect() {
    this.router.navigate(['/home']);
  }

  getTags(tags: Tag[]) {
    this.comissionTag = tags.find(tag => tag.description === 'ampliar.tag.comision')?.value;
    this.subtitleTag = tags.find(tag => tag.description === 'ampliar.subtitle')?.value;
    this.disclaTag = tags.find(tag => tag.description === 'ampliar.disclaimer')?.value;
    this.dateTag = tags.find(tag => tag.description === 'ampliar.result.fecha')?.value;
    this.quotaTag = tags.find(tag => tag.description === 'ampliar.tag.cuota')?.value;
    this.deseoTag = tags.find(tag => tag.description === 'ampliar.tag.deseo')?.value;
    this.newQuota = tags.find(tag => tag.description === 'ampliar.tag.nuevacuota')?.value;
    this.resultNew = tags.find(tag => tag.description === 'ampliar.result.nuevoplazo')?.value;
  }

  ngOnDestroy(): void {
  }

}
