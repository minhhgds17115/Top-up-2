import { Observable } from 'rxjs';
import { AppRole } from '../enums';
import { AuthResponseModel, UserProfileModel } from '../models';

export abstract class IAuthService {
  abstract get redirectAfterLoginUrl(): string;
  abstract get authenticated(): boolean;
  abstract get userProfile$(): Observable<UserProfileModel>;
  abstract get userPermissions(): string[];

  public abstract checkIsUserAuthenticated(): Observable<boolean>;
  public abstract fetchUserProfile(): Observable<UserProfileModel>;

  public abstract login(
    userName: string,
    password: string,
  ): Observable<AuthResponseModel>;
  public abstract logout(): Observable<any>;

  public abstract setPermissionsBasedRole(roles: AppRole[]): void;
  public abstract resetPermissions(): void;
  public abstract loadAppPermissions(): Promise<boolean>;

  public abstract setRedirectAfterLoginUrl(url: string): void;
}
