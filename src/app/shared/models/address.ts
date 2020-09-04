import {Province} from './province';
import {District} from './district';
import {Canton} from './canton';

export interface Address {
  province: Province;
  canton: Canton;
  district: District;
  detail: string;
  name: string;
  phoneNumber: string;
}
