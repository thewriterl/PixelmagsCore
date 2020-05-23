export interface IMagazineMagazine {
  id?: number;
  codigoRevista?: string;
  preco?: number;
  issueId?: number;
  purchaseId?: number;
  publisherId?: number;
}

export class MagazineMagazine implements IMagazineMagazine {
  constructor(
    public id?: number,
    public codigoRevista?: string,
    public preco?: number,
    public issueId?: number,
    public purchaseId?: number,
    public publisherId?: number
  ) {}
}
