import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NbAuthModule } from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbSpinnerModule,
  NbTableModule,
  NbTimepickerModule
} from '@nebular/theme';
import { ThemeModule } from 'app/@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  exports: [
    ReactiveFormsModule,
    CommonModule,

    NbSpinnerModule,
    NbCardModule,
    NbLayoutModule,
    NbCheckboxModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbAuthModule,
    NbMenuModule,
    NbTableModule,
    NbDatepickerModule,
    NbTimepickerModule,
    NbDialogModule,
    NbIconModule,

    ThemeModule,

    Ng2SmartTableModule,
    NgxPermissionsModule,
  ],
})
export class SharedModule {}
