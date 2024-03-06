export interface PreviousMovements {
    pdqId: string;
    amount: string;
    currencySimbol: string;
    establishmentName: string;
    originAmount: string;
    originDate: string;
    originCurrency: OriginCurrency;
    quota: number;
    productDisable?: boolean;
    checked?: boolean;
}

interface  OriginCurrency {
  currencyDescription: string;
  currency: string;
  currencyId: number;
}
