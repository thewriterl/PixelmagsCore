import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDeviceMagazine } from 'app/shared/model/device-magazine.model';

type EntityResponseType = HttpResponse<IDeviceMagazine>;
type EntityArrayResponseType = HttpResponse<IDeviceMagazine[]>;

@Injectable({ providedIn: 'root' })
export class DeviceMagazineService {
  public resourceUrl = SERVER_API_URL + 'api/devices';

  constructor(protected http: HttpClient) {}

  create(device: IDeviceMagazine): Observable<EntityResponseType> {
    return this.http.post<IDeviceMagazine>(this.resourceUrl, device, { observe: 'response' });
  }

  update(device: IDeviceMagazine): Observable<EntityResponseType> {
    return this.http.put<IDeviceMagazine>(this.resourceUrl, device, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDeviceMagazine>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDeviceMagazine[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
