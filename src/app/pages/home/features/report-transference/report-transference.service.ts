import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {map} from 'rxjs/operators';
import {StorageService} from '../../../../core/services/storage.service';

@Injectable()
export class ReportTransferenceService {
  private reportTransferenceUri = 'channels/reporttransfer';

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  reportTransference(body: {
    bank: string; currency: number; amount: number; paymentDate: string; imagebase64?: string; imageType?: string
  }) {
    return this.httpService.post('canales', this.reportTransferenceUri, {
      ...body, username: this.storageService.getIdentification()
    }).pipe(map(response => {
      return {type: response.type, message: response.descriptionOne};
    }));

  }
}
