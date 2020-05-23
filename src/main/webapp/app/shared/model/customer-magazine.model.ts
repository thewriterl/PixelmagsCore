export interface ICustomerMagazine {
  id?: number;
  name?: string;
  email?: string;
  fcm?: string;
  purchasesId?: number;
}

export class CustomerMagazine implements ICustomerMagazine {
  constructor(public id?: number, public name?: string, public email?: string, public fcm?: string, public purchasesId?: number) {}
}
