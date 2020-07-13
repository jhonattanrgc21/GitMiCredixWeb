import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navigation-tables',
  templateUrl: './navigation-tables.component.html',
  styleUrls: ['./navigation-tables.component.scss']
})
export class NavigationTablesComponent implements OnInit {
  options = [
    {
      id: 1, name: 'prueba 1', icon: 'cellphone', subOptions: [
        {id: 1, name: 'subopción 1', routerLink: '/'},
        {id: 2, name: 'subopción 2', routerLink: '/'},
        {id: 3, name: 'subopción 3', routerLink: '/'}
      ]
    },
    {
      id: 2, name: 'prueba 2', icon: 'public_services', subOptions: [
        {id: 4, name: 'subopción 1', routerLink: '/'},
        {id: 5, name: 'subopción 2', routerLink: '/'},
        {id: 6, name: 'subopción 3', routerLink: '/'}
      ]
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
