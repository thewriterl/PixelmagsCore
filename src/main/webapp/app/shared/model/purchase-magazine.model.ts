import { Moment } from 'moment';
import { ICustomerMagazine } from 'app/shared/model/customer-magazine.model';
import { PurchaseType } from 'app/shared/model/enumerations/purchase-type.model';

export interface IPurchaseMagazine {
  id?: number;
  date?: Moment;
  tipo?: PurchaseType;
  subscriptionId?: number;
  customers?: ICustomerMagazine[];
  magazineId?: number;
}

export class PurchaseMagazine implements IPurchaseMagazine {
  constructor(
    public id?: number,
    public date?: Moment,
    public tipo?: PurchaseType,
    public subscriptionId?: number,
    public customers?: ICustomerMagazine[],
    public magazineId?: number
  ) {}
}
