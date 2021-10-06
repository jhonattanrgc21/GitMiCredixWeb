import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ModalService } from 'src/app/core/services/modal.service';
import { TagsService } from 'src/app/core/services/tags.service';
import { ExtendTermQuota } from 'src/app/shared/models/extend-term-quota';
import { PaymentQuota } from 'src/app/shared/models/payment-quota';
import { Tag } from 'src/app/shared/models/tag';
import { ExtendTermService } from '../extend-term.service';

@Component({
  selector: 'app-previous-extend',
  templateUrl: './previous-extend.component.html',
  styleUrls: ['./previous-extend.component.scss']
})
export class PreviousExtendComponent implements OnInit {

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

  @ViewChild('summaryTemplate') summaryTemplate: TemplateRef<any>;

  constructor(
    private modalService: ModalService,
    private extendTermService: ExtendTermService,
    private tagsService: TagsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if ( this.extendTermService.movementsSelected.length <= 0 ) {
      this.router.navigate(['/home/extend-term']);
    }
    
    this.movementsSelected = this.extendTermService.movementsSelected;
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Ampliar plazo de compra').tags));
    this.getQuotas();
  }

  getQuotas() {
    this.extendTermService.getQuotasPreviousMovement( this.movementsSelected, 1005 )
      .pipe(finalize(() => this.selectMovementQuotaSummary()))
        .subscribe(
          response => {
            if ( response.listQuota.length > 0 ) {
              this.purchaseAmount = response.purchaseAmount;
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
    this.extendTermService.saveNewQuotaPreviousConsumptions(
      this.movementQuotaSummary.quotaTo,
      this.movementsSelected)
      .pipe(finalize(() => this.router.navigate([`/home/extend-term/previous-extend-success`])))
        .subscribe(response => {
          this.extendTermService.result = {
            status: response.status,
            message: response.message
          };

          this.extendTermService.newQuota = {
            establishment: '',
            currency: '₡',
            amount: this.movementQuotaSummary.amountPerQuota,
            quota: this.movementQuotaSummary.quotaTo
          };
        });
  }

  openSummary() {
    this.modalService.open({
      template: this.summaryTemplate,
      title: 'Resumen general',
    },
    {width: 380, height: 443, disableClose: true, panelClass: 'summary-panel'}
    )
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
