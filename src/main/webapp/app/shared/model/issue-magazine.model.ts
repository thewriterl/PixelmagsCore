import { Moment } from 'moment';

export interface IIssueMagazine {
  id?: number;
  edicao?: string;
  manchete?: string;
  dataLancamento?: Moment;
  descricao?: string;
  numeroPaginas?: number;
  url?: string;
  coverThumbnailContentType?: string;
  coverThumbnail?: any;
  magazineId?: number;
}

export class IssueMagazine implements IIssueMagazine {
  constructor(
    public id?: number,
    public edicao?: string,
    public manchete?: string,
    public dataLancamento?: Moment,
    public descricao?: string,
    public numeroPaginas?: number,
    public url?: string,
    public coverThumbnailContentType?: string,
    public coverThumbnail?: any,
    public magazineId?: number
  ) {}
}
