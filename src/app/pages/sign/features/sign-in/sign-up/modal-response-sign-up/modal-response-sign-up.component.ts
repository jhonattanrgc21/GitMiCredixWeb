import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-modal-response-sign-up',
  templateUrl: './modal-response-sign-up.component.html',
  styleUrls: ['./modal-response-sign-up.component.scss']
})
export class ModalResponseSignUpComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalResponseSignUpComponent>,
              @Inject(MAT_DIALOG_DATA) public data, private router: Router) {
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
    this.data.data.status === 'success' ? this.router.navigate(['/home']) : this.router.navigate(['./']);
  }

}
