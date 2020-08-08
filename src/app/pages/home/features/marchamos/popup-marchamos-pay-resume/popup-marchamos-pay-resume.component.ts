import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-marchamos-pay-resume',
  templateUrl: './popup-marchamos-pay-resume.component.html',
  styleUrls: ['./popup-marchamos-pay-resume.component.scss']
})
export class PopupMarchamosPayResumeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PopupMarchamosPayResumeComponent>, 
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
