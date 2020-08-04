import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-marchamos-new-direction',
  templateUrl: './popup-marchamos-new-direction.component.html',
  styleUrls: ['./popup-marchamos-new-direction.component.scss']
})
export class PopupMarchamosNewDirectionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PopupMarchamosNewDirectionComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

}
