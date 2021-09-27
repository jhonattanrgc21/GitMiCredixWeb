import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-previous-extend',
  templateUrl: './previous-extend.component.html',
  styleUrls: ['./previous-extend.component.scss']
})
export class PreviousExtendComponent implements OnInit {

  amountSliderStep = 1;
  amountSliderMin = 0;
  amountSliderMax = 1;
  termSliderStep = 1;
  termSliderMin = 3;
  termSliderMax = 12;
  termSliderDisplayMin = 1;
  termSliderDisplayMax = 12;
  termSliderDisplayValue = 0;

  @ViewChild('summaryTemplate') summaryTemplate: TemplateRef<any>;

  constructor(
    private modalService: ModalService,
    private route: Router,
  ) { }

  ngOnInit(): void {
  }

  getQuota(sliderValue) {
    // this.termSliderDisplayValue = this.quotas[sliderValue - 1].quota;
    // this.termControl.setValue(this.termSliderDisplayValue);
    // this.selectPersonalCreditSummary();
  }

  openSummary() {
    this.modalService.open({
      template: this.summaryTemplate,
      title: 'Resumen general',
    },
    {width: 380, height: 467, disableClose: true, panelClass: 'summary-panel'}
    )
  }

  extendTerm() {

  }
}
