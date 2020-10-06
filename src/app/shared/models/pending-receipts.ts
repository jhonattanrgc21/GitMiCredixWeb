import {Receipt} from './receipt';

export interface PendingReceipts {
  date: string;
  bankCode: string;
  serviceNumber: string;
  idType: string;
  clientName: string;
  channelType: string;
  agencyCode: string;
  responseCode: string;
  receipts: Receipt;
  feeAmount: string;
  numberPendingReceipts: number;
  identification: string;
  responseDescription: string;
  currencyCode: string;
  contractCode: string;
}
