import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { PixelmagsCoreSharedModule } from 'app/shared/shared.module';
import { PixelmagsCoreCoreModule } from 'app/core/core.module';
import { PixelmagsCoreAppRoutingModule } from './app-routing.module';
import { PixelmagsCoreHomeModule } from './home/home.module';
import { PixelmagsCoreEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    PixelmagsCoreSharedModule,
    PixelmagsCoreCoreModule,
    PixelmagsCoreHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    PixelmagsCoreEntityModule,
    PixelmagsCoreAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class PixelmagsCoreAppModule {}
