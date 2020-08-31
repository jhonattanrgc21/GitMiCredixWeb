import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';

@Component({
  selector: 'app-public-services',
  templateUrl: './public-services.component.html',
  styleUrls: ['./public-services.component.scss']
})
export class PublicServicesComponent implements OnInit {
  publicServices: string[];
  contador = 0;
  tabs = [
    {id: 1, name: 'Todos'},
    {id: 2, name: 'Favoritos'},
    {id: 3, name: 'Automáticos'},
  ];
  options = [];
  tabShow = 1;

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getPublicServices();
  }


  tabSelected(tab) {
    if (tab.id === 1) {
      this.tabShow = 1;
    } else {
      this.tabShow = 0;
    }
  }

  getPublicServices() {
    this.httpService.post('canales', 'publicservice/publicservicecategory')
      .subscribe(resp => {
        this.publicServices = resp.publicServiceCategoryList;

        this.publicServices.forEach(async publicService => {
          await this.getPublicServiceSubOptions(publicService);
        });
      });
  }

  getPublicServiceSubOptions(publicService) {
    this.httpService.post('canales', 'publicservice/publicserviceenterpriselistbycategory', {
      publicServiceCategoryId: publicService.publicServiceCategoryId,
      channelId: 102,
    })
      .subscribe(resp => {
        this.contador += 1;
        //publicService.subOptions = resp.publicServiceEnterpriseList;
        const list = resp.publicServiceEnterpriseList;
        let subtions = [];
        list.forEach(elem => {
          subtions = [...subtions, {
            name: elem.publicServiceEnterpriseDescription,
            routerLink: '',
            publicServiceEnterpriseCode: elem.publicServiceEnterpriseCode,
            publicServiceEnterpriseId: elem.publicServiceEnterpriseId
          }];
        });

        this.options = [...this.options, {
          id: this.contador,
          priority: publicService.publicServiceCategoryPriority,
          name: publicService.publicServiceCategory,
          icon: 'phone',
          subOptions: subtions,
        }];

      });

  }

}
