import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StringHelper } from '../helpers';
import { ICookieService } from '../interfaces';
import { JWT_TOKEN } from '../token';

@Injectable()
export class HttpAuthenticationInterceptor implements HttpInterceptor {
  constructor(
    @Inject(JWT_TOKEN) private _tokenKey: string,
    private readonly _cookieService: ICookieService,
  ) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (req.url.endsWith('authenticate')) {
      return next.handle(req).pipe(
        tap(response => {
          if (
            response instanceof HttpResponse &&
            response.body &&
            response.body.token
          ) {
            this._cookieService.set(this._tokenKey, response.body.token);
          }
        }),
      );
    } else {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this._cookieService.get(this._tokenKey)}`,
        },
      });

      if (StringHelper.contains(req.url, 'log-out')) {
        this._cookieService.remove(this._tokenKey);
      }

      return next.handle(authReq);
    }
  }
}
