import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-iban-accounts',
  templateUrl: './iban-accounts.component.html',
  styleUrls: ['./iban-accounts.component.scss']
})
export class IbanAccountsComponent implements OnInit {

  ibanDetailSelect: boolean;
  favoriteName: FormControl = new FormControl(null);

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.ibanDetailSelect = false;
  }

  addIbanAccount() {
    this.router.navigate(['iban-accounts/add-iban-account']);
  }

  getIbanAccountDetail(ibanDetailAccount) {
    console.log(ibanDetailAccount);
  }

  save() {

  }

  delete() {

  }
}
