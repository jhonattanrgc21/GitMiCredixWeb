import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-iban-accounts',
  templateUrl: './iban-accounts.component.html',
  styleUrls: ['./iban-accounts.component.scss']
})
export class IbanAccountsComponent implements OnInit {

  name = 'mama';
  accountNumber = 'CR04010200007369705450';

  tableHeaders = [
    {label: 'Cuentas guardadas', width: '276px'},
    {label: 'Detalle de la cuenta', width: 'auto'}
  ];

  favoriteName: FormControl = new FormControl(null);

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  addIbanAccount() {
    this.router.navigate(['./add-iban-account']);
  }

  save() {

  }

  delete() {

  }
}
