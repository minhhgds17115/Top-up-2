import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { JWT_TOKEN } from 'app/token';
import { NgxPermissionsService } from 'ngx-permissions';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AppPermission, AppRole } from '../enums';
import { IAuthService, IConfigurationService, ICookieService } from '../interfaces';
import { AuthResponseModel, UserProfileModel } from '../models';

@Injectable()
export class AuthService implements IAuthService, OnDestroy {
  get authenticated(): boolean {
    return this._authenticated;
  }

  get userProfile$(): Observable<UserProfileModel> {
    return this._userProfile$;
  }

  get userPermissions(): string[] {
    return this._userPermissions;
  }

  get redirectAfterLoginUrl(): string {
    return this._redirectAfterLoginUrl;
  }

  private _roleDefinitions: any;
  private _userPermissions: string[];
  private _authenticated: boolean;
  private _userProfile$ = new BehaviorSubject<UserProfileModel>(undefined);
  private _redirectAfterLoginUrl: string;

  constructor(
    @Inject(JWT_TOKEN) private readonly _tokenKey: string,
    private readonly _configurationService: IConfigurationService,
    private readonly _http: HttpClient,
    private readonly _cookieService: ICookieService,
    private readonly _permissionsService: NgxPermissionsService,
  ) {}

  public ngOnDestroy(): void {
    this._userProfile$.complete();
  }

  public checkIsUserAuthenticated(): Observable<boolean> {
    const token = this._cookieService.get<string>(this._tokenKey);
    // this._authenticated = !!token;
    this._authenticated = !!token;

    return of(this._authenticated);
  }

  public fetchUserProfile(): Observable<UserProfileModel> {
    // Hacking: we can only get a profile when we have token
    // so we can check token exists before make a request.
    const hasToken = !!this._cookieService.get<string>(this._tokenKey);

    // TODO: Remove return Admin role after fix bug in backend.
    return hasToken
      ? this._configurationService.apiEndpoint$.pipe(
          map(endpoint => `${endpoint}/me`),
          mergeMap(api => this._http.get<UserProfileModel>(api)),
          tap(profile => this._userProfile$.next(profile)),
          catchError(() => of({ roles: [AppRole.admin] } as UserProfileModel)),
        )
      : of({ roles: [AppRole.admin] } as UserProfileModel);
  }

  public login(
    userName: string,
    password: string,
  ): Observable<AuthResponseModel> {
    return this._configurationService.apiEndpoint$.pipe(
      map(endpoint => `${endpoint}/authenticate`),
      switchMap(api =>
        this._http.post<AuthResponseModel>(api, {
          userName,
          password,
        }),
      ),
      switchMap(authResponse =>
        this.fetchUserProfile().pipe(
          tap(
            profile => profile && this.setPermissionsBasedRole(profile.roles),
          ),
          map(() => authResponse),
        ),
      ),
    );
  }

  public logout(): Observable<any> {
    return of([]).pipe(
      tap(() => {
        this._cookieService.remove(this._tokenKey);
        this.resetPermissions();
      }),
    );
  }

  public setPermissionsBasedRole(roles: AppRole[]): void {
    const permissions = roles.reduce(
      (items, roleName) =>
        this._roleDefinitions[roleName]
          ? items.concat(this._roleDefinitions[roleName])
          : items,
      [] as string[],
    );

    this._userPermissions = [...new Set(permissions)];

    this._permissionsService.loadPermissions(this._userPermissions);
  }

  public resetPermissions(): void {
    this._permissionsService.flushPermissions();
  }

  public loadAppPermissions(): Promise<boolean> {
    return new Promise(resolve => {
      this._roleDefinitions = {
        [AppRole.admin]: this._adminPermissions(),
        [AppRole.coordinator]: this._coordinatorPermissions(),
      };

      resolve(true);
    });
  }

  public setRedirectAfterLoginUrl(url: string): void {
    this._redirectAfterLoginUrl = url;
  }

  private _adminPermissions(): string[] {
    const excludes = [
      // Exclude permissions.
      AppPermission.canCreateFaculty,
      // AppPermission.canAccessDashboardModule
    ];

    return [...Object.keys(AppPermission)].reduce(
      (result, key) => {
        const value = AppPermission[key];

        return excludes.indexOf(value) === -1 ? [...result, value] : result;
      },
      [AppRole.admin] as string[],
    );
  }

  private _coordinatorPermissions(): string[] {
    return [
      // Roles.
      AppRole.coordinator,

      // Permissions.
      AppPermission.canViewFaculties,
      AppPermission.canCreateFaculty,

      AppPermission.canEditFaculty,
      AppPermission.canDeleteFaculty,
    ];
  }
}
