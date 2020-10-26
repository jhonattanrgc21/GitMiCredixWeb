export interface Voucher {
  institution: {
    companyCode: string;
    companyName: string;
  }[];
  agreement: {
    contractCode: number;
    contractName: string;
  }[];
  channelType: string;
  agencyCode: string;
  cashier: string;
  currencyCode: string;
  clientName: string;
  billNumber: string;
  transactionNumber: string;
  paymentStatus: string;
  movementDate: string;
  expirationDate: string;
  period: string;
  reference: number;
  valorType: string;
  amount: string;
  paymentConcepts: {
    conceptAmount: string;
    conceptCode: string;
    conceptDescription: string;
  }[];
  informativeConcepts: any[];
  currencySymbol?: string;
}
