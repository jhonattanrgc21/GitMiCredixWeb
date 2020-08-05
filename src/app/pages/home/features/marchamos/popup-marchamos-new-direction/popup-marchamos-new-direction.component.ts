import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-popup-marchamos-new-direction',
  templateUrl: './popup-marchamos-new-direction.component.html',
  styleUrls: ['./popup-marchamos-new-direction.component.scss']
})
export class PopupMarchamosNewDirectionComponent implements OnInit {


  newDeliveryForm: FormGroup = new FormGroup({
    province: new FormControl('', [Validators.required]),
    canton: new FormControl('', [Validators.required]),
    distric: new FormControl('', [Validators.required]),
    exactlyDirection: new FormControl('', [Validators.required]),
    personReceive: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required])
  });

  constructor(public dialogRef: MatDialogRef<PopupMarchamosNewDirectionComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

  submit(){
    this.dialogRef.close(this.newDeliveryForm.value);
  }
}
