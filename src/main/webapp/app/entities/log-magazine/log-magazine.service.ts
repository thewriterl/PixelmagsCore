import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILogMagazine } from 'app/shared/model/log-magazine.model';

type EntityResponseType = HttpResponse<ILogMagazine>;
type EntityArrayResponseType = HttpResponse<ILogMagazine[]>;

@Injectable({ providedIn: 'root' })
export class LogMagazineService {
  public resourceUrl = SERVER_API_URL + 'api/logs';

  constructor(protected http: HttpClient) {}

  create(log: ILogMagazine): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(log);
    return this.http
      .post<ILogMagazine>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(log: ILogMagazine): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(log);
    return this.http
      .put<ILogMagazine>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ILogMagazine>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ILogMagazine[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(log: ILogMagazine): ILogMagazine {
    const copy: ILogMagazine = Object.assign({}, log, {
      date: log.date && log.date.isValid() ? log.date.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((log: ILogMagazine) => {
        log.date = log.date ? moment(log.date) : undefined;
      });
    }
    return res;
  }
}
