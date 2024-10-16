import { DeliveryPlace } from "src/app/shared/models/delivery-place";

export interface PlaceDeliveryOptionData {
  type: 1;
  deliveryPlace: DeliveryPlace;
}

export interface HomeDeliveryOptionData {
  type: 2;
  homeDeliveryOption: 1 | 2,
  addressInfo: AddressInfo
}

export interface AddressInfo{
  phone: number;
  name: string;
  address: string;
  addressId?: number;
  province?: number;
  canton?: number;
  district?: number
}

export interface DeliveryOptionsData {
  isValid: boolean;
  deliveryInfo: DeliveryInfo;
}

export type DeliveryInfo = PlaceDeliveryOptionData | HomeDeliveryOptionData
