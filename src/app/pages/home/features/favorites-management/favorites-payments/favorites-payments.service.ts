import {Injectable} from '@angular/core';
import {HttpService} from '../../../../../core/services/http.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoritesPaymentsService {

  constructor(private httpService: HttpService) {
  }

  getPublicServices() {
    return this.httpService.post('canales', 'publicservice/publicservicecategory')
      .pipe(
        map((response) => {
          if (response.type === 'success' && response.message === 'Operación exitosa') {
            return response.publicServiceCategoryList;
          } else {
            return [];
          }
        })
      );
  }

  getPublicEnterpriseServices(publicServiceId: number) {
    return this.httpService.post('canales', 'publicservice/publicserviceenterpriselistbycategory', {
      publicServiceCategoryId: publicServiceId,
      channelId: 102
    }).pipe(
      map((response) => {
        if (response.type === 'success' && response.message === 'Operación exitosa') {
          return response.publicServiceEnterpriseList;
        } else {
          return [];
        }
      })
    );
  }
}
