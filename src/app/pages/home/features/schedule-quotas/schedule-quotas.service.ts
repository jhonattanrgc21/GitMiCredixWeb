import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/app/core/services/http.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { formatyyyyMMdd } from 'src/app/shared/utils/date-formatters';

@Injectable({
  providedIn: 'root'
})
export class ScheduleQuotasService {

  private readonly ruleQuotaListUri = 'channels/rulesquotalist';
  private readonly ruleListUri = 'account/ruleslistbyaccount';
  private readonly saveExtendTermRuleUri = 'channels/saveextendtermrule';


  constructor(private httpService: HttpService,
              private storageService: StorageService
              ) { }

  getRuleQuotaList(){
    return this.httpService.post('canales', this.ruleQuotaListUri)
      .pipe(
        map((response) => {
            if ( response.status === 200 ) {
              return response.result;
            } else {
              return {};
            }
          }
        ));
  }

  getRuleList(){
    const body = {accountId: this.storageService.getCurrentUser().actId}
    return this.httpService.post('canales', this.ruleListUri, body)
      .pipe(
        map((response) => {
            if ( response.status === 200 ) {
              return response.result;
            } else {
              return {};
            }
          }
        ));
  }

  saveExtendTermRule(colonesForm: FormGroup, dolaresForm: FormGroup){
    let body = {};
    if(colonesForm.valid){
      body = {
        colones: {
          accountId: this.storageService.getCurrentUser().actId,
          quotaTo: colonesForm.value.quotas,
          amountRange: `${colonesForm.value.minimumAmount}-${colonesForm.value.maximumAmount}`,
          initDate: formatyyyyMMdd(colonesForm.value.initDate),
          endDate: colonesForm.value.endDate? formatyyyyMMdd(colonesForm.value.endDate): null
        }
      }
    }
    if(dolaresForm.valid){
      body = {
        ...body,
        dolares: {
          accountId: this.storageService.getCurrentUser().actId,
          quotaTo: dolaresForm.value.quotas,
          amountRange: `${dolaresForm.value.minimumAmount}-${dolaresForm.value.maximumAmount}`,
          initDate: formatyyyyMMdd(dolaresForm.value.initDate),
          endDate: dolaresForm.value.endDate? formatyyyyMMdd(dolaresForm.value.endDate): null
        }
      }
    }

    return this.httpService.post('canales',this.saveExtendTermRuleUri, body)
    .pipe(
      map(response => ({
        title: response.titleOne,
        message: response.message,
        type: response.type,
        status: response.status
      }))
    )

  }
}
