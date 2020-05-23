import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICustomerMagazine } from 'app/shared/model/customer-magazine.model';

type EntityResponseType = HttpResponse<ICustomerMagazine>;
type EntityArrayResponseType = HttpResponse<ICustomerMagazine[]>;

@Injectable({ providedIn: 'root' })
export class CustomerMagazineService {
  public resourceUrl = SERVER_API_URL + 'api/customers';

  constructor(protected http: HttpClient) {}

  create(customer: ICustomerMagazine): Observable<EntityResponseType> {
    return this.http.post<ICustomerMagazine>(this.resourceUrl, customer, { observe: 'response' });
  }

  update(customer: ICustomerMagazine): Observable<EntityResponseType> {
    return this.http.put<ICustomerMagazine>(this.resourceUrl, customer, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICustomerMagazine>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICustomerMagazine[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
