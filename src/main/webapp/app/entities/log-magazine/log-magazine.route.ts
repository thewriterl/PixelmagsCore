import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILogMagazine, LogMagazine } from 'app/shared/model/log-magazine.model';
import { LogMagazineService } from './log-magazine.service';
import { LogMagazineComponent } from './log-magazine.component';
import { LogMagazineDetailComponent } from './log-magazine-detail.component';
import { LogMagazineUpdateComponent } from './log-magazine-update.component';

@Injectable({ providedIn: 'root' })
export class LogMagazineResolve implements Resolve<ILogMagazine> {
  constructor(private service: LogMagazineService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILogMagazine> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((log: HttpResponse<LogMagazine>) => {
          if (log.body) {
            return of(log.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LogMagazine());
  }
}

export const logRoute: Routes = [
  {
    path: '',
    component: LogMagazineComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Logs',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LogMagazineDetailComponent,
    resolve: {
      log: LogMagazineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Logs',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LogMagazineUpdateComponent,
    resolve: {
      log: LogMagazineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Logs',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LogMagazineUpdateComponent,
    resolve: {
      log: LogMagazineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Logs',
    },
    canActivate: [UserRouteAccessService],
  },
];
