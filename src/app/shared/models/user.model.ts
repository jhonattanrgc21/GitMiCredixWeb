import {Card} from "./card.model";

export class User {
  public id: number;
  public aplId: number;
  public actId: number;
  public accountNumber: number;
  public nameAplicant: string;
  public securityToken: string;
  public card: Card;
}
