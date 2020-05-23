import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PixelmagsCoreSharedModule } from 'app/shared/shared.module';

import { MetricsComponent } from './metrics.component';

import { metricsRoute } from './metrics.route';

@NgModule({
  imports: [PixelmagsCoreSharedModule, RouterModule.forChild([metricsRoute])],
  declarations: [MetricsComponent],
})
export class MetricsModule {}
