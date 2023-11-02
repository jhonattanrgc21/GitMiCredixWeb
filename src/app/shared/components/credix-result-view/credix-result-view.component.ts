import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PopupPreviousInfoComponent} from "../../../pages/home/features/extend-term/previous-purchases/popup-previous-info/popup-previous-info.component";
import {ModalService} from "../../../core/services/modal.service";

@Component({
  selector: 'app-credix-result-view',
  templateUrl: './credix-result-view.component.html',
  styleUrls: ['./credix-result-view.component.scss']
})
export class CredixResultViewComponent implements OnInit {
  @Input() moduleTitle: string;
  @Input() resultTile: string;
  @Input() resultMessage = '';
  @Input() recordatoryForExtendTerm: boolean;
  @Input() data: any;
  @Input() status: 'success' | 'error' | 'warn' | 'info';
  @Input() buttonText: string;
  @Input() routeTo: string;
  @Input() paymentService: boolean = false;
  @Output() buttonPressed = new EventEmitter();
  //@Output() openModal = new EventEmitter();
  constructor(private modalService: ModalService) {
  }

  ngOnInit(): void {
  }

  clickButton() {
    this.buttonPressed.emit();
    if (this.recordatoryForExtendTerm) {
      this.modalService.open({data: this.data , title: 'Recordatorio', hideCloseButton: false, component: PopupPreviousInfoComponent},
        {disableClose: true, height: 324, width: 328, panelClass: 'info'});
    }
  }
}
