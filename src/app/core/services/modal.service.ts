import {Injectable, TemplateRef} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {CredixPopupComponent} from '../../shared/components/credix-popup/credix-popup.component';
import {Observable} from 'rxjs';
import {CredixConfirmationPopupComponent} from '../../shared/components/credix-confirmation-popup/credix-confirmation-popup.component';
import {CredixPopupAlternativeComponent} from '../../shared/components/credix-popup-alternative/credix-popup-alternative.component';
import {CredixCalendarComponent} from '../../shared/components/credix-calendar/credix-calendar.component';

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

  public open(data: DialogData, options: DialogOptions = {width: 800, minHeight: 0, height: 200, disableClose: true},
              modalType: 1 | 2 = 1): MatDialogRef<CredixPopupComponent | CredixPopupAlternativeComponent> {
    switch (modalType) {
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

  public confirmationPopup(title: string, message?: string, width: number | 'auto' = 420, height: number | 'auto' = 200):
    Observable<boolean> {
    let dialogRef: MatDialogRef<CredixConfirmationPopupComponent>;
    dialogRef = this.dialog.open(CredixConfirmationPopupComponent, {
      disableClose: true,
      width: width === 'auto' ? width : `${width}px`,
      height: height === 'auto' ? height : `${height}px`,
      autoFocus: false
    });
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message && message;
    return dialogRef.afterClosed();
  }

  public openCalendarPopup(startDate?: Date, endDate?: Date): Observable<any> {
    let dialogRef: MatDialogRef<CredixCalendarComponent>;
    dialogRef = this.dialog.open(CredixCalendarComponent, {
      disableClose: true,
      width: '328px',
      height: '507px',
      autoFocus: false,
      panelClass: 'calendar-panel',
    });
    dialogRef.componentInstance.endDate = endDate;
    dialogRef.componentInstance.startDate = startDate;
    return dialogRef.afterClosed();
  }

  public openModalContainer(component: any, width: number | 'auto', height: number | 'auto', data: any):
    Observable<boolean> {
    const dialogRef = this.dialog.open(component, {
      disableClose: true,
      width: width === 'auto' ? width : `${width}px`,
      height: height === 'auto' ? height : `${height}px`,
      autoFocus: false,
      data
    });
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
