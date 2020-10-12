import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {TagsService} from '../../../../core/services/tags.service';
import {Tag} from '../../../../shared/models/tag';
import {AnticipatedCancellationService} from './anticipated-cancellation.service';
import {Cancellation} from '../../../../shared/models/cancellation';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-anticipated-cancellation',
  templateUrl: './anticipated-cancellation.component.html',
  styleUrls: ['./anticipated-cancellation.component.scss'],
})
export class AnticipatedCancellationComponent implements OnInit {
  selection: Cancellation[] = [];
  displayedColumns: string[] = ['select', 'date', 'commerce', 'amount', 'quotas', 'rate'];
  dataSource: Cancellation[];
  dollarsCancellations: Cancellation[] = [];
  colonesCancellations: Cancellation[] = [];
  tabId = 1;
  colonesBalance = 0;
  initialColonesBalance = 0;
  dollarsBalance = 0;
  initialDollarsBalance = 0;
  paymentList = [];
  colonesSymbol = '₡';
  dollarsSymbol = '$';
  totalCancelled: number;
  empty = false;
  tabs = [
    {id: 1, name: 'Colones'},
    {id: 2, name: 'Dólares'},
  ];
  done = false;
  checked = false;
  message: string;
  title: string;
  status: 'success' | 'error';
  amountTag: string;
  titleTag: string;
  balanceTag: string;
  warningTag: string;
  consumedTag: string;
  pendingBalanceTag: string;
  @ViewChild('doneCancellationTemplate') doneCancellationTemplate: TemplateRef<any>;
  @ViewChild('disabledTemplate') disabledTemplate: TemplateRef<any>;
  template: TemplateRef<any>;

  constructor(private anticipatedCancellationService: AnticipatedCancellationService,
              private tagsService: TagsService) {
  }

  ngOnInit(): void {
    this.checkCutDate();
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Cancelación anticipada').tags)
    );
  }

  tabSelected(tab) {
    if (tab.id === 1) {
      this.dataSource = this.colonesCancellations;
      this.colonesBalance = this.initialColonesBalance;
      this.empty = this.colonesCancellations.length === 0;
    } else {
      this.dataSource = this.dollarsCancellations;
      this.dollarsBalance = this.initialDollarsBalance;
      this.empty = this.colonesCancellations.length === 0;
    }
    this.tabId = tab.id;
    this.selection = [];
  }

  checkCutDate() {
    this.anticipatedCancellationService.checkCutDate().subscribe(response => {
      if (response.status) {
        this.getOptionsToCancel();
      } else {
        this.message = response.descriptionOne;
        this.title = response.titleOne;
        this.done = true;
        this.template = this.disabledTemplate;
      }
    });
  }

  getOptionsToCancel() {
    this.anticipatedCancellationService.getPendingQuotas()
      .pipe(finalize(() => this.empty = this.colonesCancellations.length === 0))
      .subscribe((cancellations) => {
        if (cancellations) {
          this.dollarsCancellations = cancellations.dollarCancellations;
          this.colonesCancellations = cancellations.colonesCancellations;
          this.dollarsBalance = cancellations.dollarsBalance;
          this.initialDollarsBalance = this.dollarsBalance;
          this.colonesBalance = cancellations.colonesBalance;
          this.initialColonesBalance = this.colonesBalance;
          this.dataSource = this.colonesCancellations;
        }
      });
  }

  saveCancellation() {
    this.anticipatedCancellationService.saveAnticipatedCancellation(
      this.tabId === 1 ? this.initialColonesBalance : this.initialDollarsBalance,
      this.tabId === 1 ? this.colonesBalance : this.dollarsBalance,
      this.selection)
      .pipe(finalize(() => {
        this.template = this.doneCancellationTemplate;
        this.done = true;
      }))
      .subscribe(response => {
        this.title = response.title;
        this.message = response.message;
        this.status = response.type;
        if (response.type === 'success') {
          this.totalCancelled = this.tabId === 1 ?
            this.initialColonesBalance - this.colonesBalance : this.initialDollarsBalance - this.dollarsBalance;
        }
      });
  }

  change(checked: boolean, cancellation: Cancellation) {
    checked ? this.selection.push(cancellation) : this.selection
      .splice(this.selection.findIndex(can => can === cancellation), 1);
    if (this.tabId === 1) {
      this.colonesBalance = checked ?
        this.colonesBalance - (+cancellation.saldoPendiente) : this.colonesBalance + (+cancellation.saldoPendiente);
    } else {
      this.dollarsBalance = checked ?
        this.dollarsBalance - (+cancellation.saldoPendiente) : this.dollarsBalance + (+cancellation.saldoPendiente);
    }
  }

  getTags(tags: Tag[]) {
    this.amountTag = tags.find(tag => tag.description === 'cancelacion.tag.monto').value;
    this.titleTag = tags.find(tag => tag.description === 'cancelacion.title').value;
    this.balanceTag = tags.find(tag => tag.description === 'cancelacion.tag.saldo').value;
    this.tabs = [
      {id: 1, name: tags.find(tag => tag.description === 'cancelacion.tab1').value || 'Colones'},
      {id: 2, name: tags.find(tag => tag.description === 'cancelacion.tab2').value || 'Dólares'},
    ];
    this.warningTag = tags.find(tag => tag.description === 'cancelacion.message.warning').value;
    this.consumedTag = tags.find(tag => tag.description === 'cancelacion.tag.consumos').value;
    this.pendingBalanceTag = tags.find(tag => tag.description === 'cancelacion.tag.saldopendiente').value;

  }
}
