import { Component, OnInit, Input } from '@angular/core';
import { BillingHistory } from 'src/app/shared/models/billingHistory.models';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalService } from 'src/app/core/services/modal.service';
import { PopupMarchamosDetailComponent } from '../popup-marchamos-detail/popup-marchamos-detail.component';

@Component({
  selector: 'second-step-marchamo',
  templateUrl: './second-step-marchamo.component.html',
  styleUrls: ['./second-step-marchamo.component.scss']
})
export class SecondStepMarchamoComponent implements OnInit {



 private popupShowDetail: MatDialogRef<PopupMarchamosDetailComponent | any>;



  @Input() totalMount: any;
  @Input() billingHistorys: BillingHistory[];


  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  showDetail() {
    this.popupShowDetail = this.modalService.open({
      component: PopupMarchamosDetailComponent,
      hideCloseButton: false,
      title: 'Detalle del marchamo',
      data: this.billingHistorys
    }, {width: 380, height: 673, disableClose: false});
    this.popupShowDetail.afterClosed();
    // .subscribe(modal => this.responseResult.message = modal.message);
  }
}
