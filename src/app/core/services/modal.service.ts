import {Injectable, TemplateRef} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {CredixPopupComponent} from '../../shared/components/credix-popup/credix-popup.component';
import {Observable} from 'rxjs';
import {CredixConfirmationPopupComponent} from '../../shared/components/credix-confirmation-popup/credix-confirmation-popup.component';
import {CredixPopupAlternativeComponent} from '../../shared/components/credix-popup-alternative/credix-popup-alternative.component';

@Injectable()
export class ModalService {

  constructor(private dialog: MatDialog) {
  }

  private static fetchOptions({width, minHeight, height, disableClose, panelClass}: DialogOptions, option: 1 | 2):
    Pick<MatDialogConfig<DialogData>, 'width' | 'minHeight' | 'height' | 'disableClose' | 'panelClass'> {
    return {
      width: `${width}px`,
      minHeight: `${minHeight}px`,
      height: `${height}px`,
      disableClose,
      panelClass: [panelClass, option === 1 ? 'credix-popup-panel' : 'credix-popup-alternative-panel']
    };
  }

  open(data: DialogData, options: DialogOptions = {
         width: 800,
         minHeight: 0,
         height: 200,
         disableClose: true
       },
       option: 1 | 2 = 1): MatDialogRef<CredixPopupComponent | CredixPopupAlternativeComponent> {
    switch (option) {
      case 1:
        return this.dialog.open<CredixPopupComponent, DialogData>(
          CredixPopupComponent,
          {
            ...ModalService.fetchOptions(options, 1),
            data
          }
        );
      case 2:
        return this.dialog.open<CredixPopupAlternativeComponent, DialogData>(
          CredixPopupAlternativeComponent,
          {
            ...ModalService.fetchOptions(options, 2),
            data
          }
        );
    }
  }

  public confirmationPopup(title: string, message?: string): Observable<boolean> {
    let dialogRef: MatDialogRef<CredixConfirmationPopupComponent>;
    dialogRef = this.dialog.open(CredixConfirmationPopupComponent, {
      disableClose: true,
      width: '420px',
      height: '200px',
      autoFocus: false
    });
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message && message;
    return dialogRef.afterClosed();
  }
}

export interface DialogData {
  template?: TemplateRef<any>;
  component?: any;
  title?: string;
  hideCloseButton?: boolean;
  data?: any;
}

export interface DialogOptions {
  width: number;
  disableClose: boolean;
  minHeight?: number;
  height?: number;
  panelClass?: string;
}

