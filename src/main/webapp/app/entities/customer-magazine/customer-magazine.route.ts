import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICustomerMagazine, CustomerMagazine } from 'app/shared/model/customer-magazine.model';
import { CustomerMagazineService } from './customer-magazine.service';
import { CustomerMagazineComponent } from './customer-magazine.component';
import { CustomerMagazineDetailComponent } from './customer-magazine-detail.component';
import { CustomerMagazineUpdateComponent } from './customer-magazine-update.component';

@Injectable({ providedIn: 'root' })
export class CustomerMagazineResolve implements Resolve<ICustomerMagazine> {
  constructor(private service: CustomerMagazineService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICustomerMagazine> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((customer: HttpResponse<CustomerMagazine>) => {
          if (customer.body) {
            return of(customer.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CustomerMagazine());
  }
}

export const customerRoute: Routes = [
  {
    path: '',
    component: CustomerMagazineComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Customers',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CustomerMagazineDetailComponent,
    resolve: {
      customer: CustomerMagazineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Customers',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CustomerMagazineUpdateComponent,
    resolve: {
      customer: CustomerMagazineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Customers',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CustomerMagazineUpdateComponent,
    resolve: {
      customer: CustomerMagazineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Customers',
    },
    canActivate: [UserRouteAccessService],
  },
];
