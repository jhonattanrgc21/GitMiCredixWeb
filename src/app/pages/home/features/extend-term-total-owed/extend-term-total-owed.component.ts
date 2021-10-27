import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ModalService } from 'src/app/core/services/modal.service';
import { TagsService } from 'src/app/core/services/tags.service';
import { ExtendTermQuota } from 'src/app/shared/models/extend-term-quota';
import { PaymentQuota } from 'src/app/shared/models/payment-quota';
import { Tag } from 'src/app/shared/models/tag';
import { ConvertStringAmountToNumber } from 'src/app/shared/utils';
import { ConvertNumberToStringAmount } from 'src/app/shared/utils/convert-number-to-string-amount';
import { ExtendTermTotalOwedService } from './extend-term-total-owed.service';

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
  movementQuotaSummary: PaymentQuota = null;
  purchaseAmount: string = '';
  minimumPayment: string = '';
  pendingPayment: string = '';
  hasMinimunPayment: number = 1;
  message: string = '';
  title: string = '';
  template: TemplateRef<any>;
  done: boolean = false;
  isEmpty: boolean = false;

  @ViewChild('summaryTemplate') summaryTemplate: TemplateRef<any>;
  @ViewChild('disabledTemplate') disabledTemplate: TemplateRef<any>;


  constructor(
    private modalService: ModalService,
    private extendTermTotalOwedService: ExtendTermTotalOwedService,
    private tagsService: TagsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.checkCutDate();

    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Ampliar plazo de compra').tags));
    this.getQuotas();
  }

  checkCutDate() {
    this.extendTermTotalOwedService.checkCutDate().subscribe(response => {
      console.log("response: ", response);
      if (!response.status) {
        this.message = 'Para ampliar el plazo de su total adeudado debe realizarlo 3 días antes de su fecha de corte.';
        this.title = response.titleOne;
        // this.done = true;
        // this.template = this.disabledTemplate;
        // this.isEmpty = true;
      }
    });
  }

  getQuotas() {
    this.extendTermTotalOwedService.getQuotasPreviousMovement( this.movementsSelected, 2004 )
      .pipe(finalize(() => this.selectMovementQuotaSummary()))
        .subscribe(
          response => {
            console.log("response: ", response);
            if ( response.listQuota.length > 0 ) {
              this.purchaseAmount = response.purchaseAmount;
              this.minimumPayment = response.minimumPayment;
              console.log("covertString: ", ConvertStringAmountToNumber(this.purchaseAmount));
              console.log("covertString: ", this.minimumPayment);
              this.pendingPayment = response.purchaseAmount;
              this.pendingPayment =  ConvertNumberToStringAmount((ConvertStringAmountToNumber(this.purchaseAmount) - ConvertStringAmountToNumber(this.minimumPayment)));
              this.quotas = response.listQuota.sort((a, b) => a.quotaTo - b.quotaTo);
              this.termSliderDisplayMin = this.quotas[0].quotaTo;
              this.termSliderMin = 1;
              this.termSliderDisplayMax = this.quotas[this.quotas.length - 1].quotaTo;
              this.termSliderMax = this.quotas.length;
              this.termSliderDisplayValue = this.termSliderDisplayMin;
            }
          }
        );
  }

  getQuota(sliderValue) {
    this.termSliderDisplayValue = this.quotas[sliderValue - 1].quotaTo;
    this.selectMovementQuotaSummary();
  }

  selectMovementQuotaSummary() {
    this.movementQuotaSummary = this.quotas.find(value => value.quotaTo === this.termSliderDisplayValue);
  }

  saveQuota() {
 
          this.extendTermTotalOwedService.result = {
            status: 'success',
            message: 'El plazo de su total adeudado ha sido extendido correctamente. Estará reflejado en su próximo estado de cuenta. Le estaremos enviando un correo con los detalles del producto próximamente.',
            title: 'success',
            // status: 'error',
            // message: 'Para ampliar el plazo de su total adeudado debe realizarlo 3 días antes de su fecha de corte.',
            // title: 'error',
          };

          this.extendTermTotalOwedService.newQuota = {
            currency: '₡',
            amount: this.movementQuotaSummary.amountPerQuota,
            quota: this.movementQuotaSummary.quotaTo,
          };

          this.router.navigate([`/home/extend-term/extend-term-total-notification`])
  }
  // saveQuota() {
  //   this.extendTermTotalOwedService.saveExtendTotalDebit(
  //     this.movementQuotaSummary.quotaTo,
  //     2004)
  //     .pipe(finalize(() => this.router.navigate([`/home/extend-term/previous-extend-success`])))
  //       .subscribe(response => {
  //         this.extendTermTotalOwedService.result = {
  //           status: response.status,
  //           message: response.message,
  //           title: response.title,
  //         };

  //         this.extendTermTotalOwedService.newQuota = {
  //           currency: '₡',
  //           amount: this.movementQuotaSummary.amountPerQuota,
  //           quota: this.movementQuotaSummary.quotaTo,
  //         };
  //       });
  // }

  openSummary() {
    this.modalService.open({
      template: this.summaryTemplate,
      title: 'Resumen general',
    },
    {width: 380, height: 443, disableClose: true, panelClass: 'summary-panel'}
    )
  }

  redirect() {

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

}
