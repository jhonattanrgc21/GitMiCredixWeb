import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PublicServicesApiService} from 'src/app/core/services/public-services-api.service';
import {PublicService} from '../../../../shared/models/public-service';
import {PublicServicesService} from './public-services.service';

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
  publicServices: PublicService[] = [];
  searchingData: SearchingData[] = [];

  constructor(private publicServicesApiService: PublicServicesApiService,
              private publicServicesService: PublicServicesService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAllPublicService();
  }

  getAllPublicService() {
    this.publicServicesApiService.getAllPublicService().subscribe(publicServices => {
      this.publicServices = publicServices;
      this.searchingData = publicServices.map(service => ({
        title: service.publicServiceCategory,
        description: service.publicServiceName,
        icon: service.icon ? service.icon : '',
        result: service.publicServiceId
      }));
    });
  }

  onSearchBoxResponse(publicService: SearchingData) {
    this.publicServicesService.publicService = this.publicServices.find(service => service.publicServiceId === publicService.result);
    this.router.navigate([
      this.publicServicesService.publicService.publicServiceCategory === 'Recargas' ?
        '/home/public-services/recharge' : '/home/public-services/public-service']);
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

interface SearchingData {
  title: string;
  description: string;
  icon: string;
  result: any;
}
