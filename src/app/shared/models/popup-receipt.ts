export interface PopupReceipt {
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
  invoiceNumber: string;
  paymentStatus: string;
  movementDate: string;
  expirationDate: string;
  period: string;
  reference: number;
  typeOfValor: string;
  amount: string;
  paymentConcepts: {
    conceptAmount: string;
    conceptCode: string;
    conceptDescription: string;
  }[];
  informativeConcepts: any[];
  currencySymbol?: string;
}
