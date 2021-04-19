import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {
  NgxPermissionsGuard,
  NgxPermissionsRouterData,
  NgxPermissionsService,
  NgxRolesService
} from 'ngx-permissions';
import { isPromise } from 'rxjs/internal-compatibility';
import { IAuthService } from '../interfaces';

@Injectable()
export class RoutePermissionGuard extends NgxPermissionsGuard {
  constructor(
    permissionsService: NgxPermissionsService,
    rolesService: NgxRolesService,
    router: Router,
    private readonly _authService: IAuthService,
    private readonly _router: Router,
  ) {
    super(permissionsService, rolesService, router);
  }

  public async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    const { redirectTo }: NgxPermissionsRouterData =
      !!route && route.data ? route.data.permissions : {};
    const resolvedByParent = super.canActivate(route, state);
    const resolvedValueAsPromise = isPromise(resolvedByParent)
      ? resolvedByParent
      : Promise.resolve(resolvedByParent);

    const canAccess = await resolvedValueAsPromise;
    // Add new behavior: handle the case `redirectTo` isn't provided.
    if (!canAccess && !redirectTo) {
      const currentUrl = state.url;
      const redirectAfterLoginUrl = this._authService.redirectAfterLoginUrl;

      // Case 1: User need to login a correct account to have rights to access
      // route, but once again, the user an incorrect account, so we just
      // navigate to the main page
      if (currentUrl === redirectAfterLoginUrl) {
        this._router.navigateByUrl('/pages');
      } else {
        // Case 2: User try to access the route without permission at FIRST time
        // so we ask him to use to correct account and we will allow him to
        // re-access the previous route.
        this._authService.logout().subscribe();
        this._router.navigateByUrl('/login');
        this._authService.setRedirectAfterLoginUrl(currentUrl);
      }
    }

    return canAccess;
  }
}
