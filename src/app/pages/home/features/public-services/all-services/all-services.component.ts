import {Component, OnInit} from '@angular/core';
import {PublicServicesApiService} from '../../../../../core/services/public-services-api.service';
import {PublicServiceCategory} from '../../../../../shared/models/public-service-category';
import {PublicServiceEnterprise} from '../../../../../shared/models/public-service-enterprise';
import {PublicService} from '../../../../../shared/models/public-service';
import {Router} from '@angular/router';
import {PublicServicesService} from '../public-services.service';

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
  enterpriseSelected: PublicServiceEnterprise;
  openSubmenu = false;

  constructor(private publicServicesApiService: PublicServicesApiService,
              private publicServicesService: PublicServicesService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getPublicServiceCategories();
  }

  getPublicServiceCategories() {
    this.publicServicesApiService.getPublicServiceCategories().subscribe(categories => this.categories = categories);
  }

  getPublicServiceEnterpriseByCategory(category: PublicServiceCategory) {
    this.openSubmenu = this.categorySelected === category ? !this.openSubmenu : true;
    this.categorySelected = category;
    this.enterprises = [];
    this.publicServicesApiService.getPublicServiceEnterpriseByCategory(category.publicServiceCategoryId)
      .subscribe(enterprises => this.enterprises = enterprises);
  }

  getPublicService(enterprise: PublicServiceEnterprise) {
    this.enterpriseSelected = enterprise;
    this.publicServicesApiService.getPublicServiceByEnterprise(enterprise.publicServiceEnterpriseId)
      .subscribe(publicServices => this.publicServices = publicServices);
  }

  newPublicService(publicService: PublicService) {
    this.publicServicesService.publicService = publicService;
    this.router.navigate([
      publicService.publicServiceCategory === 'Recargas' ? '/home/public-services/recharge' : '/home/public-services/public-service']);
  }
}
