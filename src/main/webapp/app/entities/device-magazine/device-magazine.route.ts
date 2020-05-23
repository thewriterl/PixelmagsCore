import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDeviceMagazine, DeviceMagazine } from 'app/shared/model/device-magazine.model';
import { DeviceMagazineService } from './device-magazine.service';
import { DeviceMagazineComponent } from './device-magazine.component';
import { DeviceMagazineDetailComponent } from './device-magazine-detail.component';
import { DeviceMagazineUpdateComponent } from './device-magazine-update.component';

@Injectable({ providedIn: 'root' })
export class DeviceMagazineResolve implements Resolve<IDeviceMagazine> {
  constructor(private service: DeviceMagazineService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDeviceMagazine> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((device: HttpResponse<DeviceMagazine>) => {
          if (device.body) {
            return of(device.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DeviceMagazine());
  }
}

export const deviceRoute: Routes = [
  {
    path: '',
    component: DeviceMagazineComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Devices',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DeviceMagazineDetailComponent,
    resolve: {
      device: DeviceMagazineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Devices',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DeviceMagazineUpdateComponent,
    resolve: {
      device: DeviceMagazineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Devices',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DeviceMagazineUpdateComponent,
    resolve: {
      device: DeviceMagazineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Devices',
    },
    canActivate: [UserRouteAccessService],
  },
];
