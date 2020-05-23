import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMagazineMagazine, MagazineMagazine } from 'app/shared/model/magazine-magazine.model';
import { MagazineMagazineService } from './magazine-magazine.service';
import { MagazineMagazineComponent } from './magazine-magazine.component';
import { MagazineMagazineDetailComponent } from './magazine-magazine-detail.component';
import { MagazineMagazineUpdateComponent } from './magazine-magazine-update.component';

@Injectable({ providedIn: 'root' })
export class MagazineMagazineResolve implements Resolve<IMagazineMagazine> {
  constructor(private service: MagazineMagazineService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMagazineMagazine> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((magazine: HttpResponse<MagazineMagazine>) => {
          if (magazine.body) {
            return of(magazine.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MagazineMagazine());
  }
}

export const magazineRoute: Routes = [
  {
    path: '',
    component: MagazineMagazineComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Magazines',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MagazineMagazineDetailComponent,
    resolve: {
      magazine: MagazineMagazineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Magazines',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MagazineMagazineUpdateComponent,
    resolve: {
      magazine: MagazineMagazineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Magazines',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MagazineMagazineUpdateComponent,
    resolve: {
      magazine: MagazineMagazineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Magazines',
    },
    canActivate: [UserRouteAccessService],
  },
];
