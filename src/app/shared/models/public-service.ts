import {Periodicity} from './periodicity';
import {Keys} from './keys';

export interface PublicService {
  publicServiceProvider: string;
  publicServiceProviderPrefix: string;
  publicServiceCode: number;
  publicServiceCategory: string;
  publicServiceName: string;
  publicServiceId: number;
  keys: Keys[];
  quantityOfKeys: number;
  paymentType: string;
  validateAntiquity: string;
  agreementCurrency: string;
  periodicity: Periodicity[];
  latePayment: string;
}

