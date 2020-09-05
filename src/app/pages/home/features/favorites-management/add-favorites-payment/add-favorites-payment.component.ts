import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-favorites-payment',
  templateUrl: './add-favorites-payment.component.html',
  styleUrls: ['./add-favorites-payment.component.scss']
})
export class AddFavoritesPaymentComponent implements OnInit {

  newFavoritesPaymentForm: FormGroup = new FormGroup({
    codeCredix: new FormControl(null, [Validators.required])
  });

  constructor() {
  }

  ngOnInit(): void {
  }

}
