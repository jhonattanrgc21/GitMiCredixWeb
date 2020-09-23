import {Component, OnInit} from '@angular/core';
import {PublicServicesApiService} from '../../../../../core/services/public-services-api.service';
import {PublicServiceCategory} from '../../../../../shared/models/public-service-category';
import {PublicServiceEnterprise} from '../../../../../shared/models/public-service-enterprise';
import {PublicService} from '../../../../../shared/models/public-service';

@Component({
  selector: 'app-all-services',
  templateUrl: './all-services.component.html',
  styleUrls: ['./all-services.component.scss', '../public-services.component.scss']
})
export class AllServicesComponent implements OnInit {
  tableHeaders = [
    {label: 'Categorías', width: '283px'},
    {label: 'Servicios', width: 'auto'}
  ];
  categories: PublicServiceCategory[] = [];
  enterprises: PublicServiceEnterprise[] = [];
  publicServices: PublicService[] = [];
  categorySelected: PublicServiceCategory;
  enterpriseId: number;

  constructor(private publicServicesApiService: PublicServicesApiService) {
  }

  ngOnInit(): void {
    this.getPublicServiceCategories();
    this.getPublicServiceCategories();
  }

  getPublicServiceCategories() {
    this.publicServicesApiService.getPublicServiceCategories().subscribe(categories => this.categories = categories);
  }

  getPublicServiceEnterpriseByCategory(category: PublicServiceCategory) {
    this.categorySelected = category;
    this.enterprises = [];
    this.publicServicesApiService.getPublicServiceEnterpriseByCategory(category.publicServiceCategoryId)
      .subscribe(enterprises => this.enterprises = enterprises);
  }

  getPublicService(enterpriseId: number) {
    this.enterpriseId = enterpriseId;
    this.publicServicesApiService.getPublicServiceByEnterprise(enterpriseId)
      .subscribe(publicServices => this.publicServices = publicServices);
  }
}
