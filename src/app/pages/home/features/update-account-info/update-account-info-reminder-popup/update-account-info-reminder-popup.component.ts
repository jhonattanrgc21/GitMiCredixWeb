import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalService } from 'src/app/core/services/modal.service';
import { UpdateAccountInfoPopUp } from '../update-account-info-popup/update-account-info-popup.component';

@Component({
  selector: 'update-account-info-reminder-popup',
  templateUrl: './update-account-info-reminder-popup.component.html',
  styleUrls: ['./update-account-info-reminder-popup.component.scss']
})
export class UpdateAccountInfoReminderPopUp {
  omitModal: boolean

  constructor(
    private modalService: ModalService,
    public dialogRef: MatDialogRef<UpdateAccountInfoReminderPopUp>,
    @Inject(MAT_DIALOG_DATA) public dataModal
  ) {
    this.omitModal = this.dataModal.data.omitModal
  }

  updateAccount(){
    this.modalService.open({
      component: UpdateAccountInfoPopUp,
      title: null,
    }, {width: 608, disableClose: true, panelClass: 'update-account-info-popup'})

  }

  skipUpdate(){
    this.dialogRef.close()
  }
}
