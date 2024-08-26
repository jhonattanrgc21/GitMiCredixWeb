import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'add-management-component',
  templateUrl: './add-management.component.html',
  styleUrls: ['./add-management.component.scss']
})
export class AddManagementPageComponent implements OnInit {
  managementOptions = [
    {
      name: 'Aumentar limite de credito',
      route: '/home/managements/increase-limit'
    },
    {
      name: 'Renovar Tarjeta',
      route: '/home/managements/renew-cards'
    },
    {
      name: 'Tarjeta robada o extraviada',
      route: '/home/managements/rob-or-loss'
    },
    {
      name: 'Trasladar Saldo',
      route: ''
    },
    {
      name: 'Solicitar tarjeta adicional',
      route: ''
    },
    {
      name: 'Tarjeta danada',
      route: '/home/managements/damaged-card'
    },
    {
      name: 'Ver o cambiar PIN de tarjeta',
      route: '/home/managements/card-pin-codes'
    },
  ]

  constructor(private router: Router) { }

  ngOnInit(): void { }

  navigateTo(route: string) {
    if(!route) return

    this.router.navigate([route])
  }
}
