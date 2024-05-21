import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { HttpService } from "src/app/core/services/http.service";
import { StorageService } from "src/app/core/services/storage.service";
import { ExtendTermRuleQuota } from "src/app/shared/models/extend-term-rule-quota";
import { formatyyyyMMdd } from "src/app/shared/utils/date-formatters";

export interface RuleQuotas {
  colonesQuotas?: ExtendTermRuleQuota[];
  dollarsQuotas?: ExtendTermRuleQuota[];
  minimumAmountColones?: number;
  maximumAmountColones?: number;
  minimumAmountDollars?: number;
  maximumAmountDollars?: number;
}

@Injectable({
  providedIn: "root",
})
export class ScheduleQuotasService {
  private readonly ruleQuotaListUri = "channels/rulesquotalist";
  private readonly ruleListUri = "account/ruleslistbyaccount";
  private readonly saveExtendTermRuleUri = "channels/saveextendtermrule";
  private readonly getDateRangeByAccountCycleUrl =
    "account/getDateRangeByAccountCycle";

  constructor(
    private httpService: HttpService,
    private storageService: StorageService
  ) {}

  ruleQuotaList: BehaviorSubject<RuleQuotas> = new BehaviorSubject<RuleQuotas>(
    {}
  );

  getRuleQuotaList() {
    return this.httpService.post("canales", this.ruleQuotaListUri).pipe(
      map((response) => {
        if (response.status === 200) {
          return response.result;
        } else {
          return {};
        }
      })
    );
  }

  getRuleList() {
    const body = { accountId: this.storageService.getCurrentUser().actId };
    return this.httpService.post("canales", this.ruleListUri, body).pipe(
      map((response) => {
        if (response.status === 200) {
          return response.result;
        } else {
          return {};
        }
      })
    );
  }

  saveExtendTermRule(colonesForm: FormGroup, dolaresForm: FormGroup) {
    let body = {};
    if (colonesForm.valid) {
      body = {
        colones: {
          id: colonesForm.value.id ?? null,
          accountId: this.storageService.getCurrentUser().actId,
          quotaTo: colonesForm.value.quotas,
          amountRange: `${colonesForm.value.minimumAmount}-${colonesForm.value.maximumAmount}`,
          initDate: colonesForm.value.initDate
            ? formatyyyyMMdd(colonesForm.value.initDate)
            : null,
          endDate: colonesForm.value.endDate
            ? formatyyyyMMdd(colonesForm.value.endDate)
            : null,
          isActive: colonesForm.value.isActive ?? null,
        },
      };
    }
    if (dolaresForm.valid) {
      body = {
        ...body,
        dolares: {
          id: dolaresForm.value.id ?? null,
          accountId: this.storageService.getCurrentUser().actId,
          quotaTo: dolaresForm.value.quotas,
          amountRange: `${dolaresForm.value.minimumAmount}-${dolaresForm.value.maximumAmount}`,
          initDate: dolaresForm.value.initDate
            ? formatyyyyMMdd(dolaresForm.value.initDate)
            : null,
          endDate: dolaresForm.value.endDate
            ? formatyyyyMMdd(dolaresForm.value.endDate)
            : null,
          isActive: dolaresForm.value.isActive ?? null,
        },
      };
    }

    return this.httpService
      .post("canales", this.saveExtendTermRuleUri, body)
      .pipe(
        map((response) => ({
          title: response.titleOne,
          message: response.message,
          type: response.type,
          status: response.status,
        }))
      );
  }

  getDateRangeByAccountCycle() {
    const body = { accountId: this.storageService.getCurrentUser().actId };
    return this.httpService
      .post("canales", this.getDateRangeByAccountCycleUrl, body)
      .pipe(
        map((response) => {
          if (response.status === 200) {
            return {
              rangeApply: response.rangeApply,
              rangeDoesNotApply: response.rangeDoesNotApply,
            };
          } else {
            return {};
          }
        })
      );
  }
}
