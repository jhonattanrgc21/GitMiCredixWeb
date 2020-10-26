import {PaymentPlaceRestriction} from './payment-place-restriction';

export interface PaymentPlaceDetail {
  linkFacebook: string;
  name: string;
  webPage: string;
  paymentPlaceRestriction?: PaymentPlaceRestriction[];
}
