import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-confirmation-popup',
  templateUrl: './credix-confirmation-popup.component.html',
  styleUrls: ['./credix-confirmation-popup.component.scss']
})
export class CredixConfirmationPopupComponent {
  title: string;
  message: string;
  okButton: boolean;

  constructor(public modal: MatDialogRef<CredixConfirmationPopupComponent>) {
  }
}
