import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPublisherMagazine, PublisherMagazine } from 'app/shared/model/publisher-magazine.model';
import { PublisherMagazineService } from './publisher-magazine.service';
import { PublisherMagazineComponent } from './publisher-magazine.component';
import { PublisherMagazineDetailComponent } from './publisher-magazine-detail.component';
import { PublisherMagazineUpdateComponent } from './publisher-magazine-update.component';

@Injectable({ providedIn: 'root' })
export class PublisherMagazineResolve implements Resolve<IPublisherMagazine> {
  constructor(private service: PublisherMagazineService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPublisherMagazine> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((publisher: HttpResponse<PublisherMagazine>) => {
          if (publisher.body) {
            return of(publisher.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PublisherMagazine());
  }
}

export const publisherRoute: Routes = [
  {
    path: '',
    component: PublisherMagazineComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Publishers',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PublisherMagazineDetailComponent,
    resolve: {
      publisher: PublisherMagazineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Publishers',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PublisherMagazineUpdateComponent,
    resolve: {
      publisher: PublisherMagazineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Publishers',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PublisherMagazineUpdateComponent,
    resolve: {
      publisher: PublisherMagazineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Publishers',
    },
    canActivate: [UserRouteAccessService],
  },
];
