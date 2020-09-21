import {Component, OnInit} from '@angular/core';
import {PublicServicesApiService} from '../../../../../core/services/public-services-api.service';
import {PublicServiceCategoryModel} from '../../../../../shared/models/public-service-category.model';
import {PublicServiceEnterpriseModel} from '../../../../../shared/models/public-service-enterprise.model';
import {PublicServiceModel} from '../../../../../shared/models/public-service.model';

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
  categories: PublicServiceCategoryModel[] = [];
  enterprises: PublicServiceEnterpriseModel[] = [];
  publicServices: PublicServiceModel[] = [];
  categorySelected: PublicServiceCategoryModel;
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

  getPublicServiceEnterpriseByCategory(category: PublicServiceCategoryModel) {
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
