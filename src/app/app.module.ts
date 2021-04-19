/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NB_TIME_PICKER_CONFIG
} from '@nebular/theme';
import { environment } from 'environments/environment';
import { NgxPermissionsModule } from 'ngx-permissions';
import { tap } from 'rxjs/operators';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticatedGuard, RoutePermissionGuard } from './guards';
import { httpInterceptorProviders } from './interceptors';
import {
  IAuthService,
  IConfigurationService,
  ICookieService,
  IMenuService
} from './interfaces';
import { LoginModule } from './pages/login/login.module';
import {
  AuthService,
  ConfigurationService,
  CookieService,
  MenuService
} from './services';
import { CONFIG_URL, JWT_TOKEN } from './token';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    NbDatepickerModule.forRoot(),
    LoginModule,
  ],
  providers: [
    httpInterceptorProviders,
    {
      provide: CONFIG_URL,
      useValue:
        environment.environment === 'prod'
          ? 'assets/config.prod.json'
          : 'assets/config.json',
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (
        config: IConfigurationService,
        authService: IAuthService,
      ) => async () => {
        await config.load();
        await authService.loadAppPermissions();

        return authService
          .fetchUserProfile()
          .pipe(
            tap(profile => {
              console.log(profile);
              return (
                profile && authService.setPermissionsBasedRole(profile.roles)
              );
            }),
          )
          .toPromise();
      },
      deps: [IConfigurationService, IAuthService],
      multi: true,
    },
    {
      provide: JWT_TOKEN,
      useValue: 'jwt',
    },
    {
      provide: IConfigurationService,
      useClass: ConfigurationService,
    },
    {
      provide: IAuthService,
      useClass: AuthService,
    },
    {
      provide: IConfigurationService,
      useClass: ConfigurationService,
    },
    {
      provide: ICookieService,
      useClass: CookieService,
    },
    {
      provide: IMenuService,
      useClass: MenuService,
    },
    {
      provide:NB_TIME_PICKER_CONFIG,
      useValue:{}
      },
    RoutePermissionGuard,
    AuthenticatedGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
