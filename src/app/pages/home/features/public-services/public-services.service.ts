import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {Cacheable} from 'ngx-cacheable';
import {Observable} from 'rxjs';
import {StorageService} from '../../../../core/services/storage.service';
import {map} from 'rxjs/operators';
import {PublicServiceFavoriteByUser} from '../../../../shared/models/public-service-favorite-by-user';
import {SchedulePayments} from '../../../../shared/models/schedule-payments';

const iconPerCategory = [
  {category: 'Recargas', icon: 'cellphone'},
  {category: 'Telefonía', icon: 'phone'},
  {category: 'Electricidad', icon: 'public_services'},
  {category: 'Agua', icon: 'water'},
  {category: 'Internet y cable', icon: 'television'},
  {category: 'Municipalidades', icon: 'municipalidad'},
];

@Injectable()
export class PublicServicesService {

  private readonly getPublicServiceFavoriteByUserUri = 'publicservice/findallpublicservicefavoritebyuser';

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  @Cacheable()
  getPublicServicesFavoritesByUser(): Observable<PublicServiceFavoriteByUser[]> {
    return this.httpService.post('canales', this.getPublicServiceFavoriteByUserUri,
      {
        userId: this.storageService.getCurrentUser().userId,
        channelId: 102
      }).pipe(
      map((response) => {
        if (response.type === 'success') {
          (response.publicServiceFavoriteList as PublicServiceFavoriteByUser[]).forEach(category => {
            category.icon = iconPerCategory.find(icon => icon.category === category.publicServiceCategory)?.icon;
          });
          return response.publicServiceFavoriteList;
        } else {
          return [];
        }
      })
    );
  }

  @Cacheable()
  getAllSchedulersPayment(): Observable<SchedulePayments[]> {
    return this.httpService.post('canales', 'schedulerpayment/getscheduledpays', {channelId: 102})
      .pipe(
        map((response) => {
          if (response.scheduledPayList?.length > 0 && response.message === 'Operación exitosa') {
            (response.scheduledPayList as SchedulePayments[]).forEach(category => {
              category.icon = iconPerCategory.find(icon => icon.category === category.publicServiceCategoryName)?.icon;
            });
            return response.scheduledPayList;
          } else {
            return [];
          }
        })
      );
  }
}
