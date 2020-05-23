import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PixelmagsCoreSharedModule } from 'app/shared/shared.module';
import { SubscriptionPlanMagazineComponent } from './subscription-plan-magazine.component';
import { SubscriptionPlanMagazineDetailComponent } from './subscription-plan-magazine-detail.component';
import { SubscriptionPlanMagazineUpdateComponent } from './subscription-plan-magazine-update.component';
import { SubscriptionPlanMagazineDeleteDialogComponent } from './subscription-plan-magazine-delete-dialog.component';
import { subscriptionPlanRoute } from './subscription-plan-magazine.route';

@NgModule({
  imports: [PixelmagsCoreSharedModule, RouterModule.forChild(subscriptionPlanRoute)],
  declarations: [
    SubscriptionPlanMagazineComponent,
    SubscriptionPlanMagazineDetailComponent,
    SubscriptionPlanMagazineUpdateComponent,
    SubscriptionPlanMagazineDeleteDialogComponent,
  ],
  entryComponents: [SubscriptionPlanMagazineDeleteDialogComponent],
})
export class PixelmagsCoreSubscriptionPlanMagazineModule {}
