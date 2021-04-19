import { NbMenuItem } from '@nebular/theme';
import { AppPermission } from '../enums';

export type MenuItem = NbMenuItem & {
  requiredPermission?: AppPermission;
};
