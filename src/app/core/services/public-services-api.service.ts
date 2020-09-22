import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Cacheable} from 'ngx-cacheable';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {PublicServiceEnterpriseModel} from '../../shared/models/public-service-enterprise.model';
import {PublicServiceCategoryModel} from '../../shared/models/public-service-category.model';
import {PublicServiceModel} from '../../shared/models/public-service.model';

const iconPerCategory = [
  {category: 'Recargas', icon: 'cellphone'},
  {category: 'Telefonía', icon: 'phone'},
  {category: 'Electricidad', icon: 'public_services'},
  {category: 'Agua', icon: 'water'},
  {category: 'Internet y cable', icon: 'television'},
  {category: 'Municipalidades', icon: 'municipalidad'},
];

@Injectable()
export class PublicServicesApiService {
  private readonly getPublicServiceCategoriesUri = 'publicservice/publicservicecategory';
  private readonly getPublicServiceEnterpriseByCategoryUri = 'publicservice/publicserviceenterpriselistbycategory';
  private readonly getPublicServiceByEnterpriseUri = 'publicservice/publicservicelistbyenterpriseid';

  constructor(private httpService: HttpService) {
  }

  @Cacheable()
  getPublicServiceCategories(): Observable<PublicServiceCategoryModel[]> {
    return this.httpService.post('canales', this.getPublicServiceCategoriesUri)
      .pipe(
        map((response) => {
          if (response.type === 'success') {
            (response.publicServiceCategoryList as PublicServiceCategoryModel[]).forEach(category => {
              category.icon = iconPerCategory.find(icon => icon.category === category.publicServiceCategory)?.icon;
            });
            return response.publicServiceCategoryList;
          } else {
            return [];
          }
        }));
  }

  @Cacheable({
    maxCacheCount: 5
  })
  getPublicServiceEnterpriseByCategory(publicServiceCategoryId: number): Observable<PublicServiceEnterpriseModel[]> {
    return this.httpService.post('canales', this.getPublicServiceEnterpriseByCategoryUri, {publicServiceCategoryId})
      .pipe(
        map((response) => {
          if (response.type === 'success') {
            return response.publicServiceEnterpriseList;
          } else {
            return [];
          }
        }));
  }

  @Cacheable({
    maxCacheCount: 5
  })
  getPublicServiceByEnterprise(enterpriseId: number): Observable<PublicServiceModel[]> {
    return this.httpService.post('canales', this.getPublicServiceByEnterpriseUri, {enterpriseId})
      .pipe(
        map((response) => {
          if (response.type === 'success') {
            return response.publicServiceList;
          } else {
            return [];
          }
        }));
  }
}
