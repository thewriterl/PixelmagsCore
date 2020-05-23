import { SubscriptionPeriod } from 'app/shared/model/enumerations/subscription-period.model';

export interface ISubscriptionPlanMagazine {
  id?: number;
  nome?: string;
  preco?: number;
  periodo?: SubscriptionPeriod;
  purchaseId?: number;
}

export class SubscriptionPlanMagazine implements ISubscriptionPlanMagazine {
  constructor(
    public id?: number,
    public nome?: string,
    public preco?: number,
    public periodo?: SubscriptionPeriod,
    public purchaseId?: number
  ) {}
}
