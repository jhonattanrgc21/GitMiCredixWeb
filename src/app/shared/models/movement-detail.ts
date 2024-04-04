export interface MovementDetail {
  feeAmount: number;
  amount: number;
  commissionPercentage: number;
  feePercentage: number;
  quota: number;
  amountPerQuota: number;
  commissionAmount: number;
  movements: Detail[];
}


interface Detail {
  amount: number;
  originCurrency: number;
  establishmentName: string;
  movementId: number;
  originDate: Date;
}

