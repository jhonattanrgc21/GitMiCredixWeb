export interface ThAddress {
  tadId: number;
  country: string;
  province: string;
  district: string;
  canton: string;
  detail: string;
}

export interface ApplicantAddressInfo{
  addresses: ThAddress[];
  phone: number;
  email: string;
}

