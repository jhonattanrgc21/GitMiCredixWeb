import {Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ModalService} from '../../../../../core/services/modal.service';
import {PersonalCreditService} from '../personal-credit.service';
import {GlobalRequestsService} from '../../../../../core/services/global-requests.service';
import {PersonalCreditSummary} from '../../../../../shared/models/personal-credit-summary';
import {ConvertStringAmountToNumber} from '../../../../../shared/utils';
import {finalize} from 'rxjs/operators';

const MIN_AMOUNT = 100000;

@Component({
  selector: 'app-personal-credit-first-step',
  templateUrl: './personal-credit-first-step.component.html',
  styleUrls: ['./personal-credit-first-step.component.scss']
})
export class PersonalCreditFirstStepComponent implements OnInit, OnChanges {
  @Input() amountControl: FormControl = new FormControl(MIN_AMOUNT);
  @Input() termControl: FormControl = new FormControl(null);
  @Input() cardLimit = 0;
  @ViewChild('summaryTemplate') summaryTemplate: TemplateRef<any>;
  personalCreditSummary: PersonalCreditSummary;
  personalCreditsSummaries: PersonalCreditSummary[];
  ivaAmount = 0;
  sliderStep = 10000;
  termSliderStep = 3;
  termSliderMin = 3;
  termSliderMax = 12;

  constructor(private modalService: ModalService,
              private personalCreditService: PersonalCreditService,
              private globalRequestsService: GlobalRequestsService) {
  }

  ngOnInit(): void {
    this.getQuotas();
    this.checkAmount();
    this.personalCreditService.emitAmountChanges(MIN_AMOUNT);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.amountControl.firstChange) {

    }
  }

  getPersonalCreditsSummaries() {
    this.personalCreditService.getPersonalCreditsSummaries(this.amountControl.value, 2)
      .pipe(finalize(() => this.selectPersonalCreditSummary()))
      .subscribe(response => this.personalCreditsSummaries = response);
  }

  selectPersonalCreditSummary() {
    this.personalCreditSummary = this.personalCreditsSummaries.find(value => value.term === this.termControl.value);
    this.ivaAmount = Number((ConvertStringAmountToNumber(this.personalCreditSummary.commission) * 0.13).toFixed(2));
    this.personalCreditService.emitPersonalCreditSummaryChanges(this.personalCreditSummary);
    console.log(this.personalCreditSummary);
  }

  getQuotas() {
    this.globalRequestsService.getQuotas(1)
      .pipe(finalize(() => this.getPersonalCreditsSummaries()))
      .subscribe(response => {
        const quotas = response.sort((a, b) => a - b);
        this.termSliderMin = quotas[0];
        this.termSliderMax = quotas[quotas.length - 1];
        this.termSliderStep = this.termSliderMin === 3 ? 3 : 6;
        this.termControl.setValue(this.termSliderMin);
        this.changeTermSliderStep();
      });
  }

  checkAmount() {
    this.amountControl.valueChanges.subscribe(value => {
      this.personalCreditService.emitAmountChanges(value);
      this.getPersonalCreditsSummaries();

      if (value >= 100000 && value < 300000) {
        this.sliderStep = 10000;
      } else if (value >= 300000 && value < 1000000) {
        this.sliderStep = 50000;
      } else {
        this.sliderStep = 100000;
      }
    });
  }

  changeTermSliderStep() {
    this.termControl.valueChanges.subscribe(value => {
      this.selectPersonalCreditSummary();

      if (value > 3) {
        this.termSliderStep = 6;
      } else {
        this.termSliderStep = 3;
      }
    });
  }

  openSummary() {
    this.modalService.open({template: this.summaryTemplate, title: 'Resumen general'},
      {width: 380, height: 467, disableClose: true, panelClass: 'summary-panel'});
  }
}
