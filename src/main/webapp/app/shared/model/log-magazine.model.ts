import { Moment } from 'moment';
import { Event } from 'app/shared/model/enumerations/event.model';

export interface ILogMagazine {
  id?: number;
  date?: Moment;
  evento?: Event;
}

export class LogMagazine implements ILogMagazine {
  constructor(public id?: number, public date?: Moment, public evento?: Event) {}
}
