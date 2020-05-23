import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PixelmagsCoreSharedModule } from 'app/shared/shared.module';
import { PurchaseMagazineComponent } from './purchase-magazine.component';
import { PurchaseMagazineDetailComponent } from './purchase-magazine-detail.component';
import { PurchaseMagazineUpdateComponent } from './purchase-magazine-update.component';
import { PurchaseMagazineDeleteDialogComponent } from './purchase-magazine-delete-dialog.component';
import { purchaseRoute } from './purchase-magazine.route';

@NgModule({
  imports: [PixelmagsCoreSharedModule, RouterModule.forChild(purchaseRoute)],
  declarations: [
    PurchaseMagazineComponent,
    PurchaseMagazineDetailComponent,
    PurchaseMagazineUpdateComponent,
    PurchaseMagazineDeleteDialogComponent,
  ],
  entryComponents: [PurchaseMagazineDeleteDialogComponent],
})
export class PixelmagsCorePurchaseMagazineModule {}
