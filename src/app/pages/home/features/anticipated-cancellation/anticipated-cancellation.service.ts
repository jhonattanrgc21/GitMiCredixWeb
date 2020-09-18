import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {map} from 'rxjs/operators';
import {Cancellation} from '../../../../shared/models/cancellation';
import {ConvertStringAmountToNumber} from '../../../../shared/utils';

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

  getPendingQuotas() {
    return this.httpService.post('canales', this.pendingQuotasUri).pipe(
      map(response => {
          if (response.type === 'success') {
            const cancellations = {
              dollarCancellations: response.CuotasDolares,
              colonesCancellations: response.CuotasColones,
              dollarsBalance: ConvertStringAmountToNumber(response.SaldoDisponibleDolares),
              colonesBalance: ConvertStringAmountToNumber(response.SaldoDisponibleColones)
            } as
              { dollarCancellations: Cancellation[], colonesCancellations: Cancellation[], dollarsBalance: number, colonesBalance: number };
            cancellations.dollarCancellations = cancellations.dollarCancellations
              .map(can => ({...can, saldoPendiente: ConvertStringAmountToNumber(can.saldoPendiente.toString())}));
            cancellations.colonesCancellations = cancellations.colonesCancellations
              .map(can => ({...can, saldoPendiente: ConvertStringAmountToNumber(can.saldoPendiente.toString())}));
            return cancellations;
          }
          return null;
        }
      )
    );
  }

  saveAnticipatedCancellation(initialBalance: number, finalBalance: number, paymentList: Cancellation[]) {
    return this.httpService.post('canales', this.saveAnticipatedCancellationUri, {
      saldoInicial: initialBalance,
      saldoFinal: finalBalance,
      advancePaymentList: paymentList,
    });
  }
}
