import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IIssueMagazine } from 'app/shared/model/issue-magazine.model';

type EntityResponseType = HttpResponse<IIssueMagazine>;
type EntityArrayResponseType = HttpResponse<IIssueMagazine[]>;

@Injectable({ providedIn: 'root' })
export class IssueMagazineService {
  public resourceUrl = SERVER_API_URL + 'api/issues';

  constructor(protected http: HttpClient) {}

  create(issue: IIssueMagazine): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(issue);
    return this.http
      .post<IIssueMagazine>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(issue: IIssueMagazine): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(issue);
    return this.http
      .put<IIssueMagazine>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IIssueMagazine>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IIssueMagazine[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(issue: IIssueMagazine): IIssueMagazine {
    const copy: IIssueMagazine = Object.assign({}, issue, {
      dataLancamento: issue.dataLancamento && issue.dataLancamento.isValid() ? issue.dataLancamento.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataLancamento = res.body.dataLancamento ? moment(res.body.dataLancamento) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((issue: IIssueMagazine) => {
        issue.dataLancamento = issue.dataLancamento ? moment(issue.dataLancamento) : undefined;
      });
    }
    return res;
  }
}
