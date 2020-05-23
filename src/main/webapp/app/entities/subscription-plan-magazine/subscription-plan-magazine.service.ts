import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISubscriptionPlanMagazine } from 'app/shared/model/subscription-plan-magazine.model';

type EntityResponseType = HttpResponse<ISubscriptionPlanMagazine>;
type EntityArrayResponseType = HttpResponse<ISubscriptionPlanMagazine[]>;

@Injectable({ providedIn: 'root' })
export class SubscriptionPlanMagazineService {
  public resourceUrl = SERVER_API_URL + 'api/subscription-plans';

  constructor(protected http: HttpClient) {}

  create(subscriptionPlan: ISubscriptionPlanMagazine): Observable<EntityResponseType> {
    return this.http.post<ISubscriptionPlanMagazine>(this.resourceUrl, subscriptionPlan, { observe: 'response' });
  }

  update(subscriptionPlan: ISubscriptionPlanMagazine): Observable<EntityResponseType> {
    return this.http.put<ISubscriptionPlanMagazine>(this.resourceUrl, subscriptionPlan, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISubscriptionPlanMagazine>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISubscriptionPlanMagazine[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
