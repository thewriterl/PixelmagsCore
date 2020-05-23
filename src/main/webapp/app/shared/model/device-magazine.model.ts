export interface IDeviceMagazine {
  id?: number;
  fabricante?: string;
  modelo?: string;
  os?: string;
  customerId?: number;
}

export class DeviceMagazine implements IDeviceMagazine {
  constructor(public id?: number, public fabricante?: string, public modelo?: string, public os?: string, public customerId?: number) {}
}
