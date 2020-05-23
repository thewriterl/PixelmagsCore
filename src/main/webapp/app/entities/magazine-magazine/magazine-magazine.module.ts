import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PixelmagsCoreSharedModule } from 'app/shared/shared.module';
import { MagazineMagazineComponent } from './magazine-magazine.component';
import { MagazineMagazineDetailComponent } from './magazine-magazine-detail.component';
import { MagazineMagazineUpdateComponent } from './magazine-magazine-update.component';
import { MagazineMagazineDeleteDialogComponent } from './magazine-magazine-delete-dialog.component';
import { magazineRoute } from './magazine-magazine.route';

@NgModule({
  imports: [PixelmagsCoreSharedModule, RouterModule.forChild(magazineRoute)],
  declarations: [
    MagazineMagazineComponent,
    MagazineMagazineDetailComponent,
    MagazineMagazineUpdateComponent,
    MagazineMagazineDeleteDialogComponent,
  ],
  entryComponents: [MagazineMagazineDeleteDialogComponent],
})
export class PixelmagsCoreMagazineMagazineModule {}
