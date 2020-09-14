import {Tag} from './tag';

export interface Functionality {
  id: number;
  level: number;
  iconAddress: string;
  description: string;
  status: number;
  link: string;
  superiorFuncionality: string;
  tags: Tag[];
}
