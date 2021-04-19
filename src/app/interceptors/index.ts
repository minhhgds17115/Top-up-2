import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpAuthenticationInterceptor } from './http-authentication.interceptor';

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpAuthenticationInterceptor,
    multi: true,
  },
];
