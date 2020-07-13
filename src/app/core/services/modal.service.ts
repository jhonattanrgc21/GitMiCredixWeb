import {Injectable, TemplateRef} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {CredixPopupComponent} from '../../shared/components/credix-popup/credix-popup.component';

@Injectable()
export class ModalService {

  constructor(private dialog: MatDialog) {
  }

  private static fetchOptions({width, height, disableClose}: DialogOptions):
    Pick<MatDialogConfig<DialogData>, 'width' | 'height' | 'disableClose'> {
    return {
      width: `${width}px`,
      height: `${height}px`,
      disableClose
    };
  }

  open(data: DialogData, options: DialogOptions = {width: 800, height: 500, disableClose: true}):
    MatDialogRef<CredixPopupComponent> {
    return this.dialog.open<CredixPopupComponent, DialogData>(
      CredixPopupComponent,
      {
        ...ModalService.fetchOptions(options),
        data
      }
    );
  }

}

export interface DialogData {
  template: TemplateRef<any>;
  title?: string;
}

export interface DialogOptions {
  width: number;
  height: number;
  disableClose: boolean;
}

