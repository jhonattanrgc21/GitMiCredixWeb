export interface AllowedMovement {
  originAmount: string;
  originCurrency: any;
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
