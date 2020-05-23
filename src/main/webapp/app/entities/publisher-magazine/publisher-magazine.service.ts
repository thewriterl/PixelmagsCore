import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPublisherMagazine } from 'app/shared/model/publisher-magazine.model';

type EntityResponseType = HttpResponse<IPublisherMagazine>;
type EntityArrayResponseType = HttpResponse<IPublisherMagazine[]>;

@Injectable({ providedIn: 'root' })
export class PublisherMagazineService {
  public resourceUrl = SERVER_API_URL + 'api/publishers';

  constructor(protected http: HttpClient) {}

  create(publisher: IPublisherMagazine): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(publisher);
    return this.http
      .post<IPublisherMagazine>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(publisher: IPublisherMagazine): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(publisher);
    return this.http
      .put<IPublisherMagazine>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPublisherMagazine>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPublisherMagazine[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(publisher: IPublisherMagazine): IPublisherMagazine {
    const copy: IPublisherMagazine = Object.assign({}, publisher, {
      dataCadastro: publisher.dataCadastro && publisher.dataCadastro.isValid() ? publisher.dataCadastro.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataCadastro = res.body.dataCadastro ? moment(res.body.dataCadastro) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((publisher: IPublisherMagazine) => {
        publisher.dataCadastro = publisher.dataCadastro ? moment(publisher.dataCadastro) : undefined;
      });
    }
    return res;
  }
}
