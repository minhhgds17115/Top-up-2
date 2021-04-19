import { AppRole } from '../enums';

export interface UserProfileModel {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  roles: AppRole[];

  // TODO: define more properties if necessaries
}
