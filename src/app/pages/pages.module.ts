import { NgModule } from '@angular/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ThemeModule } from '../@theme/theme.module';
import { SharedModule } from '../modules';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { TopicsModule } from './topics/topics.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    SharedModule,
    NgxPermissionsModule.forChild(),
    DashboardModule,
    TopicsModule,
  ],
  declarations: [PagesComponent],
})
export class PagesModule {}
