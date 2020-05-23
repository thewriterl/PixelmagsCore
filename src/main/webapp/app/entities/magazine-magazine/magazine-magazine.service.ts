import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMagazineMagazine } from 'app/shared/model/magazine-magazine.model';

type EntityResponseType = HttpResponse<IMagazineMagazine>;
type EntityArrayResponseType = HttpResponse<IMagazineMagazine[]>;

@Injectable({ providedIn: 'root' })
export class MagazineMagazineService {
  public resourceUrl = SERVER_API_URL + 'api/magazines';

  constructor(protected http: HttpClient) {}

  create(magazine: IMagazineMagazine): Observable<EntityResponseType> {
    return this.http.post<IMagazineMagazine>(this.resourceUrl, magazine, { observe: 'response' });
  }

  update(magazine: IMagazineMagazine): Observable<EntityResponseType> {
    return this.http.put<IMagazineMagazine>(this.resourceUrl, magazine, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMagazineMagazine>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMagazineMagazine[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
