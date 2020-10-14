import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {map} from 'rxjs/operators';
import {Cancellation} from '../../../../shared/models/cancellation';
import {Observable} from 'rxjs';

@Injectable()
export class AnticipatedCancellationService {
  private readonly cutDateUri = 'channels/cutdate';
  private readonly pendingQuotasUri = 'account/pendingquotes';
  private readonly saveAnticipatedCancellationUri = 'account/saveadvancepayments';

  constructor(private httpService: HttpService) {
  }

  checkCutDate() {
    return this.httpService.post('canales', this.cutDateUri);
  }

  getPendingQuotas(): Observable<{
    dollarCancellations: Cancellation[],
    colonesCancellations: Cancellation[],
    dollarsBalance: string,
    colonesBalance: string
  }> {
    return this.httpService.post('canales', this.pendingQuotasUri).pipe(
      map(response => {
        if (response.type === 'success') {
          return {
            dollarCancellations: response.CuotasDolares,
            colonesCancellations: response.CuotasColones,
            dollarsBalance: response.SaldoDisponibleDolares,
            colonesBalance: response.SaldoDisponibleColones
          };
        }
          return null;
        }
      )
    );
  }

  saveAnticipatedCancellation(initialBalance: string, finalBalance: string, paymentList: Cancellation[]):
    Observable<{ title: string, message: string, type: 'success' | 'error' }> {
    return this.httpService.post('canales', this.saveAnticipatedCancellationUri, {
      saldoInicial: initialBalance,
      saldoFinal: finalBalance,
      advancePaymentList: paymentList,
    }).pipe(
      map(response => ({title: response.titleOne, message: response.descriptionOne, type: response.type}))
    );
  }
}
