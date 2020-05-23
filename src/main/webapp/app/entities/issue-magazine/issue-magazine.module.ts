import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PixelmagsCoreSharedModule } from 'app/shared/shared.module';
import { IssueMagazineComponent } from './issue-magazine.component';
import { IssueMagazineDetailComponent } from './issue-magazine-detail.component';
import { IssueMagazineUpdateComponent } from './issue-magazine-update.component';
import { IssueMagazineDeleteDialogComponent } from './issue-magazine-delete-dialog.component';
import { issueRoute } from './issue-magazine.route';

@NgModule({
  imports: [PixelmagsCoreSharedModule, RouterModule.forChild(issueRoute)],
  declarations: [IssueMagazineComponent, IssueMagazineDetailComponent, IssueMagazineUpdateComponent, IssueMagazineDeleteDialogComponent],
  entryComponents: [IssueMagazineDeleteDialogComponent],
})
export class PixelmagsCoreIssueMagazineModule {}
