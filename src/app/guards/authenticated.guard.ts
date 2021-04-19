import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { IAuthService } from 'app/interfaces';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private readonly _authService: IAuthService,
    private readonly _router: Router,
  ) {}

  public canActivate(
    _: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this._isAuthenticated(state.url);
  }

  private _isAuthenticated(url: string): Observable<boolean> {
    // This mean that user logged in and value cached
    if (this._authService.authenticated) {
      return of(true);
    }

    return this._authService.checkIsUserAuthenticated().pipe(
      map(authorized => {
        if (authorized) {
          return true;
        } else {
          this._router.navigateByUrl('/login');
          this._authService.setRedirectAfterLoginUrl(url);

          return false;
        }
      }),
    );
  }
}
