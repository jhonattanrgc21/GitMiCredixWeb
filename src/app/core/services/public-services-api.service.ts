import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Cacheable} from 'ngx-cacheable';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {PublicServiceEnterprise} from '../../shared/models/public-service-enterprise';
import {PublicServiceCategory} from '../../shared/models/public-service-category';
import {PublicService} from '../../shared/models/public-service';
import {StorageService} from './storage.service';
import {PublicServiceFavoriteByUser} from '../../shared/models/public-service-favorite-by-user';

const iconPerCategory = [
  {category: 'Recargas', icon: 'cellphone'},
  {category: 'Telefonía', icon: 'phone'},
  {category: 'Electricidad', icon: 'public_services'},
  {category: 'Agua', icon: 'water'},
  {category: 'Internet y Cable', icon: 'internet_cable'},
  {category: 'Municipalidades', icon: 'municipalidad'},
  {category: 'Mantenimiento', icon: 'municipalidad'},
  {category: 'Educación', icon: 'municipalidad'},
];

@Injectable()
export class PublicServicesApiService {
  private readonly getPublicServiceCategoriesUri = 'publicservice/publicservicecategory';
  private readonly getPublicServiceEnterpriseByCategoryUri = 'publicservice/publicserviceenterpriselistbycategory';
  private readonly getPublicServiceByEnterpriseUri = 'publicservice/publicservicelistbyenterpriseid';
  private readonly getAllFavoritePublicServiceUri = 'publicservice/findallpublicservicefavoritebyuser';

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  @Cacheable()
  getPublicServiceCategories(): Observable<PublicServiceCategory[]> {
    return this.httpService.post('canales', this.getPublicServiceCategoriesUri)
      .pipe(
        map((response) => {
          if (response.type === 'success') {
            (response.publicServiceCategoryList as PublicServiceCategory[]).forEach(category => {
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
  getPublicServiceEnterpriseByCategory(publicServiceCategoryId: number): Observable<PublicServiceEnterprise[]> {
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
  getPublicServiceByEnterprise(enterpriseId: number): Observable<PublicService[]> {
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

  @Cacheable()
  getAllFavoritePublicServiceByUser(): Observable<PublicServiceFavoriteByUser[]> {
    return this.httpService.post('canales', this.getAllFavoritePublicServiceUri, {
      userId: this.storageService.getCurrentUser().userId
    })
      .pipe(
        map((response) => {
          if (response.publicServiceFavoriteList?.length > 0 && response.message === 'Operación exitosa') {
            return response.publicServiceFavoriteList;
          } else {
            return [];
          }
        })
      );
  }
}
