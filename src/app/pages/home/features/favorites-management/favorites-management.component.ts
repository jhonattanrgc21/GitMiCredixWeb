import {Component, OnInit} from '@angular/core';
import {CredixToastService} from '../../../../core/services/credix-toast.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-favorites-management',
  templateUrl: './favorites-management.component.html',
  styleUrls: ['./favorites-management.component.scss']
})
export class FavoritesManagementComponent implements OnInit {

  tabs = [
    {id: 1, name: 'Cuentas IBAN'},
    {id: 2, name: 'Pagos favoritos'},
    {id: 3, name: 'Automáticos'}
  ];

  constructor(private toastService: CredixToastService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  tabSelected(tab) {
    switch (tab.id) {
      case 1:
        this.router.navigate(['home/favorites-management/iban-accounts']);
        break;
      case 2:
        this.router.navigate(['home/favorites-management/favorites-payments']);
        break;
      case 3:
        this.router.navigate(['home/favorites-management/automatics']);
        break;
    }
  }

}
