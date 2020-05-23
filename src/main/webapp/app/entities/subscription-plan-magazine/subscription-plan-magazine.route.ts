import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISubscriptionPlanMagazine, SubscriptionPlanMagazine } from 'app/shared/model/subscription-plan-magazine.model';
import { SubscriptionPlanMagazineService } from './subscription-plan-magazine.service';
import { SubscriptionPlanMagazineComponent } from './subscription-plan-magazine.component';
import { SubscriptionPlanMagazineDetailComponent } from './subscription-plan-magazine-detail.component';
import { SubscriptionPlanMagazineUpdateComponent } from './subscription-plan-magazine-update.component';

@Injectable({ providedIn: 'root' })
export class SubscriptionPlanMagazineResolve implements Resolve<ISubscriptionPlanMagazine> {
  constructor(private service: SubscriptionPlanMagazineService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISubscriptionPlanMagazine> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((subscriptionPlan: HttpResponse<SubscriptionPlanMagazine>) => {
          if (subscriptionPlan.body) {
            return of(subscriptionPlan.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SubscriptionPlanMagazine());
  }
}

export const subscriptionPlanRoute: Routes = [
  {
    path: '',
    component: SubscriptionPlanMagazineComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'SubscriptionPlans',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SubscriptionPlanMagazineDetailComponent,
    resolve: {
      subscriptionPlan: SubscriptionPlanMagazineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'SubscriptionPlans',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SubscriptionPlanMagazineUpdateComponent,
    resolve: {
      subscriptionPlan: SubscriptionPlanMagazineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'SubscriptionPlans',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SubscriptionPlanMagazineUpdateComponent,
    resolve: {
      subscriptionPlan: SubscriptionPlanMagazineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'SubscriptionPlans',
    },
    canActivate: [UserRouteAccessService],
  },
];
