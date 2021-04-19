import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/modules';
import { ThemeModule } from '../../@theme/theme.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    ThemeModule,
    SharedModule
  ],
  declarations: [LoginComponent],
})
export class LoginModule {}
