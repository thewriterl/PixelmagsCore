import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPurchaseMagazine, PurchaseMagazine } from 'app/shared/model/purchase-magazine.model';
import { PurchaseMagazineService } from './purchase-magazine.service';
import { PurchaseMagazineComponent } from './purchase-magazine.component';
import { PurchaseMagazineDetailComponent } from './purchase-magazine-detail.component';
import { PurchaseMagazineUpdateComponent } from './purchase-magazine-update.component';

@Injectable({ providedIn: 'root' })
export class PurchaseMagazineResolve implements Resolve<IPurchaseMagazine> {
  constructor(private service: PurchaseMagazineService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPurchaseMagazine> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((purchase: HttpResponse<PurchaseMagazine>) => {
          if (purchase.body) {
            return of(purchase.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PurchaseMagazine());
  }
}

export const purchaseRoute: Routes = [
  {
    path: '',
    component: PurchaseMagazineComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Purchases',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PurchaseMagazineDetailComponent,
    resolve: {
      purchase: PurchaseMagazineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Purchases',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PurchaseMagazineUpdateComponent,
    resolve: {
      purchase: PurchaseMagazineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Purchases',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PurchaseMagazineUpdateComponent,
    resolve: {
      purchase: PurchaseMagazineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Purchases',
    },
    canActivate: [UserRouteAccessService],
  },
];
