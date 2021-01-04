import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-credix-image-upload-confirm',
  templateUrl: './credix-image-upload-confirm.component.html',
  styleUrls: ['./credix-image-upload-confirm.component.scss']
})
export class CredixImageUploadConfirmComponent implements OnInit {

  constructor(public dialog: MatDialogRef<CredixImageUploadConfirmComponent>) {
  }

  ngOnInit(): void {
  }

}
