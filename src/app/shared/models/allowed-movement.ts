export interface AllowedMovement {
  originAmount: string;
  amount?: string;
  originCurrency: OriginCurrency;
  establishmentName: string;
  cardId: number;
  totalPlanQuota: number;
  accountNumber: number;
  movementId: string;
  originDate: string;
  promoApply: boolean;
  promoMessage?: string;
  promoDiscountMessage?: string;
  productDisable?: boolean;
  checked?: boolean;
}

interface OriginCurrency {
  currencyDescription: string;
  currency: string;
  currencyId: number;
}
