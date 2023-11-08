import { ExtendTermRuleQuota } from "./extend-term-rule-quota";

export interface ProgrammedRule{
  id: number;
  amountRange: string;
  quota: number;
  initDate: string;
  endDate: string;
  currencyId: number;
  listQuota: ExtendTermRuleQuota
}

export interface Currency {
  code: number;
  description: string;
  isSelected: boolean;
}
