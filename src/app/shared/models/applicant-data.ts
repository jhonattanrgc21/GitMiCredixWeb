export interface ApplicantDataResponse {
  data: ApplicantData;
  message: string;
  type: string;
  status: number;
}

export interface ApplicantData {
  income: ApplicantSalaryIncome | ApplicantIndependentIncome | null;
  birthdate: string;
  gender: string;
  mailAddress: ApplicantMailAddress | null;
  civilStatus: number;
  documentExpirationDate: string;
  firstName: string;
  identification: string;
  typeIdentificacionId: number;
  lastNames: string;
  email: string;
  cellPhone: number;
  workPhone: number | null;
  homePhone: number | null;
  referencePhone: number | null;
  otherPhone: number | null;
  homeAddress: ApplicantHomeAddress;
}

export interface ApplicantSalaryIncome {
  incomeOriginId: 1;
  employerName: string;
  netIncome: string;
  profession: number;
  jobPosition: string;
  laborYears: number;
}
export interface ApplicantIndependentIncome {
  incomeOriginId: 2;
  incomeSource: string;
  monthlyIncome: string;
  profession: number;
  economicActivity: number;
  laborYears: number;
  provinceId: number;
  cantonId: number;
  districtId: number;
  address: string;
}

export interface ApplicantHomeAddress {
  cantonId: number;
  districtId: number;
  detail: string;
  provinceId: number;
}


export interface ApplicantMailAddress {
  city: string;
  postalCode: string;
  detail: string;
  state: number;
  countryId: number;
}
