import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Cacheable} from 'ngx-cacheable';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {PublicServiceEnterprise} from '../../shared/models/public-service-enterprise';
import {PublicServiceCategory} from '../../shared/models/public-service-category';
import {PublicService} from '../../shared/models/public-service';
import {StorageService} from './storage.service';
import {PublicServiceFavoriteByUser} from '../../shared/models/public-service-favorite-by-user';

const iconPerCategory = [
  {category: 'Recargas', icon: 'recargas'},
  {category: 'Telefonía', icon: 'telefonia'},
  {category: 'Electricidad', icon: 'electricidad'},
  {category: 'Agua', icon: 'agua'},
  {category: 'Internet y Cable', icon: 'tv_cable_satelite'},
  {category: 'Cable', icon: 'tv_cable_satelite'},
  {category: 'Internet', icon: 'internet'},
  {category: 'TV por cable y satélite', icon: 'tv_cable_satelite'},
  {category: 'Otros servicios', icon: 'otros_servicios'},
  {category: 'Venta por catálogo', icon: 'venta_catalogo'},
  {category: 'Seguridad Vial y CTP', icon: 'seguridad_vial_ctp'},
  {category: 'Seguros', icon: 'seguros'},
  {category: 'CCSS', icon: 'ccss'},
  {category: 'Colegios profesionales', icon: 'educacion'},
  {category: 'Cuotas', icon: 'cuotas'},
  {category: 'Ministerio de Salud', icon: 'ministerio_de_salud'},
  {category: 'Municipalidades', icon: 'municipalidades'},
  {category: 'Mantenimiento', icon: 'municipalidades'},
  {category: 'Educación', icon: 'educacion'},
  {category: 'Empresas de seguridad', icon: 'empresas_seguridad'}
];

export const cleanFavoritesPublicService$ = new Subject();

@Injectable()
export class PublicServicesApiService {
  private readonly getPublicServiceCategoriesUri = 'publicservice/publicservicecategory';
  private readonly getPublicServiceEnterpriseByCategoryUri = 'publicservice/publicserviceenterpriselistbycategory';
  private readonly getPublicServiceByEnterpriseUri = 'publicservice/publicservicelistbyenterpriseid';
  private readonly getAllFavoritePublicServiceUri = 'publicservice/findallpublicservicefavoritebyuser';
  private readonly getAllPublicServiceUri = 'publicservice/findAll';

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

  @Cacheable({
    cacheBusterObserver: cleanFavoritesPublicService$.asObservable()
  })
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

  @Cacheable()
  getAllPublicService(): Observable<PublicService[]> {
    return this.httpService.post('canales', this.getAllPublicServiceUri)
      .pipe(
        map((response) => {
          if (response.type === 'success') {
            return response.publicServiceList.map(service => {
              service.icon = iconPerCategory.find(icon => icon.category === service.publicServiceCategory.name)?.icon;
              return {
                publicServiceProvider: '',
                publicServiceProviderPrefix: '',
                publicServiceCode: service.code,
                publicServiceCategory: service.publicServiceCategory.name,
                publicServiceName: service.description,
                publicServiceId: service.id,
                keys: service.keys,
                quantityOfKeys: service.quantityOfKeys,
                paymentType: service.paymentType,
                validateAntiquity: service.validateAntiquity,
                agreementCurrency: service.agreementCurrency,
                periodicity: service.periodicity,
                latePayment: service.latePayment,
                icon: service.icon ? service.icon : ''
              } as PublicService;
            });
          } else {
            return [];
          }
        }));
  }
}
