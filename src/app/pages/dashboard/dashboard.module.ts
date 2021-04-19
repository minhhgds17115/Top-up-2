import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { SharedModule } from 'app/modules';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    SharedModule
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
