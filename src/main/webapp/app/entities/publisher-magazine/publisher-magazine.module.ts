import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PixelmagsCoreSharedModule } from 'app/shared/shared.module';
import { PublisherMagazineComponent } from './publisher-magazine.component';
import { PublisherMagazineDetailComponent } from './publisher-magazine-detail.component';
import { PublisherMagazineUpdateComponent } from './publisher-magazine-update.component';
import { PublisherMagazineDeleteDialogComponent } from './publisher-magazine-delete-dialog.component';
import { publisherRoute } from './publisher-magazine.route';

@NgModule({
  imports: [PixelmagsCoreSharedModule, RouterModule.forChild(publisherRoute)],
  declarations: [
    PublisherMagazineComponent,
    PublisherMagazineDetailComponent,
    PublisherMagazineUpdateComponent,
    PublisherMagazineDeleteDialogComponent,
  ],
  entryComponents: [PublisherMagazineDeleteDialogComponent],
})
export class PixelmagsCorePublisherMagazineModule {}
