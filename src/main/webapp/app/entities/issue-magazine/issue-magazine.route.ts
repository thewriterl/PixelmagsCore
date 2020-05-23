import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IIssueMagazine, IssueMagazine } from 'app/shared/model/issue-magazine.model';
import { IssueMagazineService } from './issue-magazine.service';
import { IssueMagazineComponent } from './issue-magazine.component';
import { IssueMagazineDetailComponent } from './issue-magazine-detail.component';
import { IssueMagazineUpdateComponent } from './issue-magazine-update.component';

@Injectable({ providedIn: 'root' })
export class IssueMagazineResolve implements Resolve<IIssueMagazine> {
  constructor(private service: IssueMagazineService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IIssueMagazine> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((issue: HttpResponse<IssueMagazine>) => {
          if (issue.body) {
            return of(issue.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new IssueMagazine());
  }
}

export const issueRoute: Routes = [
  {
    path: '',
    component: IssueMagazineComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Issues',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: IssueMagazineDetailComponent,
    resolve: {
      issue: IssueMagazineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Issues',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: IssueMagazineUpdateComponent,
    resolve: {
      issue: IssueMagazineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Issues',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: IssueMagazineUpdateComponent,
    resolve: {
      issue: IssueMagazineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Issues',
    },
    canActivate: [UserRouteAccessService],
  },
];
