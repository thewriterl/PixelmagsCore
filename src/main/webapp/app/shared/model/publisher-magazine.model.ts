import { Moment } from 'moment';
import { IMagazineMagazine } from 'app/shared/model/magazine-magazine.model';

export interface IPublisherMagazine {
  id?: number;
  nome?: string;
  dataCadastro?: Moment;
  magazines?: IMagazineMagazine[];
}

export class PublisherMagazine implements IPublisherMagazine {
  constructor(public id?: number, public nome?: string, public dataCadastro?: Moment, public magazines?: IMagazineMagazine[]) {}
}
