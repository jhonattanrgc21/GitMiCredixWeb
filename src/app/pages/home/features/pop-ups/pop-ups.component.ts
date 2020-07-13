import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ModalService} from 'src/app/core/services/modal.service';


@Component({
  selector: 'app-pop-ups',
  templateUrl: './pop-ups.component.html',
  styleUrls: ['./pop-ups.component.scss']
})
export class PopUpsComponent implements OnInit {
  @ViewChild('firstModalTemplate') firstModalTemplate: TemplateRef<any>;
  @ViewChild('secondModalTemplate') secondModalTemplate: TemplateRef<any>;
  secondModal: MatDialogRef<any>;
  message: string;

  constructor(private dialog: MatDialog, private modalService: ModalService) {
  }

  ngOnInit(): void {
  }

  openFirstModal() {
    this.modalService.open({template: this.firstModalTemplate});
  }

  openSecondModal() {
    this.secondModal = this.modalService.open({template: this.secondModalTemplate, title: 'Segundo modal'},
      {width: 400, height: 600, disableClose: false});
    this.secondModal.afterClosed().subscribe(modal => this.message = modal.message);
  }

  openThirdModal() {
    this.modalService.confirmationPopup('¿Desea realizar esta recarga?')
      .subscribe();
  }
}
