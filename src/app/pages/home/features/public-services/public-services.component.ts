import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PublicServicesApiService} from 'src/app/core/services/public-services-api.service';
import {PublicService} from '../../../../shared/models/public-service';
import {PublicServicesService} from './public-services.service';
import {TagsService} from '../../../../core/services/tags.service';
import {Tag} from '../../../../shared/models/tag';
import { Observable } from 'rxjs';

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
  changeHeightDim: Observable<any>;
  heightDim: string = '662px';

  constructor(private publicServicesApiService: PublicServicesApiService,
              private publicServicesService: PublicServicesService,
              private router: Router,
              private tagsService: TagsService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.publicServicesService.tabIndex = 'Todos';

    this.changeHeightDim = this.publicServicesService.changeHeightDim$;

    this.changeHeightDim.subscribe(heightDim => {
      console.log("Llego");
      this.heightDim = heightDim;
      // Mark as check
      this.changeDetectorRef.markForCheck();
    });

    this.getAllPublicService();
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Servicios').tags)
    );
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
        this.publicServicesService.tabIndex = 'Todos';
        this.router.navigate(['home/public-services']);
        break;
        case 2:
          this.publicServicesService.tabIndex = 'Favoritos';
          this.router.navigate(['home/public-services/favorites']);
          this.publicServicesService.emitIsTabChange();
          break;
        case 3:
        this.publicServicesService.tabIndex = 'Automáticos';
        this.router.navigate(['home/public-services/automatics']);
        this.publicServicesService.emitIsTabChange();
        break;
    }

  }

  getTags(tags: Tag[]) {
    this.tabs = [
      {id: 1, name: tags.find(tag => tag.description === 'servicios.tab1')?.value || 'Todos'},
      {id: 2, name: tags.find(tag => tag.description === 'servicios.tab2')?.value || 'Favoritos'},
      {id: 3, name: tags.find(tag => tag.description === 'servicios.tab3')?.value || 'Automáticos'}
    ];
  }
}

interface SearchingData {
  title: string;
  description: string;
  icon: string;
  result: any;
}
