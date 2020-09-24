import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpService} from '../../../../core/services/http.service';
import {Observable} from 'rxjs';
import {PendingReceipts} from '../../../../shared/models/pending-receipts';
import {ConvertStringDateToDate} from '../../../../shared/utils';
import {StorageService} from '../../../../core/services/storage.service';

@Injectable()
export class PublicServicesService {
  private readonly getReferenceNameUri = 'publicservicebncr/namereferencebypublicservicecategory';
  private readonly getPendingReceiptsUri = 'publicservicebncr/pendingreceipts';
  private readonly payPublicServiceUri = 'publicservicebncr/servicepayment';
  private readonly getMinAmountsUri = 'channels/publicservice/recharge/rechargeamountlist';

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  getReferenceName(publicServiceCategoryId: number): Observable<string> {
    return this.httpService.post('incomex', this.getReferenceNameUri, {publicServiceCategoryId})
      .pipe(
        map((response) => {
            if (response.type === 'success') {
              return response.nombreReferencia;
            } else {
              return '';
            }
          }
        ));
  }

  checkPendingReceipts(publicServiceId: number, accessKey: number): Observable<PendingReceipts> {
    return this.httpService.post('incomex', this.getPendingReceiptsUri, {publicServiceId, accessKey})
      .pipe(
        map((response: PendingReceipts) => {
            response.receipts = response.receipts.sort((a, b) =>
              ConvertStringDateToDate(a.receiptPeriod).getMonth() - ConvertStringDateToDate(b.receiptPeriod).getMonth());
            return response;
          }
        ));
  }

  payPublicService(publicServiceId: number, serviceValue: number, amount: string, term: number,
                   expirationDate: string, billNumber: string): Observable<any> {
    return this.httpService.post('incomex', this.payPublicServiceUri, {
      cardId: this.storageService.getCurrentCards().find(element => element.category === 'Principal').cardId.toString(),
      currencyId: '188',
      publicServiceId,
      serviceValue,
      amount,
      term,
      expirationDate,
      billNumber
    });
  }

  savePublicServiceFavorite(publicServiceId: number, serviceReference: string, aliasName: string, credixCode: number) {
    return this.httpService.post('canales', 'publicservice/savepublicservicefavorite', {
      accountId: this.storageService.getCurrentUser().actId,
      publicServiceId,
      serviceReference,
      paymentDay: 21,
      userId: this.storageService.getCurrentUser().userId,
      aliasName,
      publicServiceAccessKeyId: 1,
      codeCredix: credixCode
    });
  }

  getMinAmounts() {
    return this.httpService.post('incomex', this.getMinAmountsUri).pipe(map(response => {
      if (response.type === 'success') {
        return response.rechargeAmountList;
      } else {
        return [];
      }
    }));
  }

}
