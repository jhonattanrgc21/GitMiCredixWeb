import {Injectable} from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import {HttpService} from './http.service';
import {Observable, of} from 'rxjs';
import {Cacheable} from 'ngx-cacheable';
import { showModalResponse } from 'src/app/shared/models/show-modal-response';
import { StorageService } from './storage.service';

@Injectable()
export class InfoToShowModalService {
  private readonly getInfoToShowUri = 'account/getinfotoshowmodal';

  constructor(private httpService: HttpService, private storageService: StorageService) {}

  @Cacheable()
  getInfoToShowModal(modalName: string): Observable<showModalResponse> {
    return this.httpService.post('canales', this.getInfoToShowUri, {
      userId: this.storageService.getCurrentUser().userId,
      modal: modalName,
      dispositive: "238723",
      hasSeen: false
    })
      .pipe(
        tap((response: showModalResponse) => {
          if (response.type !== 'success') {
            throw new Error("Ocurrio un Error")
          }
        }),
        catchError(err => {
          console.log('Error: ', err);
          return of(err);
        })
      );
  }

}
