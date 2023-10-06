import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ExtendTermService} from '../../extend-term.service';

@Component({
  selector: 'app-popup-previous-info',
  templateUrl: './popup-previous-info.component.html',
  styleUrls: ['./popup-previous-info.component.scss']
})
export class PopupPreviousInfoComponent implements OnInit {
  amountSummary = '0,0';
  pagoContado = '0.0';
  subtraction = '0.0';
  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<PopupPreviousInfoComponent>) {
    this.amountSummary = this.data.data.amountSummary;
    this.pagoContado = this.data.data.pagoContado;
  }

  ngOnInit(): void {
    const calculateSubtraction =
      +this.pagoContado.replace('.', '').replace(',', '.') -
      +this.amountSummary.replace('.', '').replace(',', '.');
    this.subtraction = calculateSubtraction.toString().replace('.', ',');
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
