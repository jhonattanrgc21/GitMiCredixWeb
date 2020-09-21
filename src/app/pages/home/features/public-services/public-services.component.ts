import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-public-services',
  templateUrl: './public-services.component.html',
  styleUrls: ['./public-services.component.scss']
})
export class PublicServicesComponent implements OnInit {
  tabs = [
    {id: 1, name: 'Todos'},
    {id: 2, name: 'Favoritos'},
    {id: 3, name: 'Automáticos'}
  ];
  tabId: number;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  tabSelected(tab) {
    this.tabId = tab.id;
    switch (tab.id) {
      case 1:
        this.router.navigate(['home/public-services']);
        break;
      case 2:
        this.router.navigate(['home/public-services/favorites']);
        break;
      case 3:
        this.router.navigate(['home/public-services/automatics']);
        break;
    }

  }
}
