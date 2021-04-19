import { Injectable } from '@angular/core';
import { AppPermission } from 'app/enums';
import { BehaviorSubject, Observable } from 'rxjs';
import { FONT_AWESOME_PACK } from '../app.constants';
import { IAuthService, IMenuService } from '../interfaces';
import { MenuItem } from '../models';

@Injectable()
export class MenuService implements IMenuService {
  get menuItems$(): Observable<MenuItem[]> {
    return this._menuItems$;
  }

  private _menuItems$ = new BehaviorSubject<MenuItem[]>(undefined);
  private _defaultMenuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'home-outline',
      link: '/pages/dashboard',
      home: true,
      requiredPermission: AppPermission.canAccessDashboardModule,
    },
    {
      title: 'FEATURES',
      group: true,
    },
    {
      title: 'Topics',
      icon: {
        icon: 'list-alt',
        pack: FONT_AWESOME_PACK,
      },
      link: '/pages/topics',

      requiredPermission: AppPermission.canAccessTopicsModule,
    },
    {
      title: 'ManageTopics',
      icon: {
        icon: 'list-alt',
        pack: FONT_AWESOME_PACK,
      },
      link: '/pages/manage-topics',

      //requiredPermission: AppPermission.canAccessTopicsModule,
    },
    {
      title: 'Contributions',
      icon: {
        icon: 'list-alt',
        pack: FONT_AWESOME_PACK,
      },
      link: '/pages/contributions',

      // requiredPermission: AppPermission.canAccessTopicsModule,
    },
    
  ];

  constructor(private readonly _authService: IAuthService) {}

  public buildMenuItems(): void {
    const getAccessibleItemsOnly = (menuItems: MenuItem[]) => {
      if (!menuItems) {
        return null;
      }

      const filteredMenuItems = menuItems.reduce(
        (arr, menuItem) =>
          this._authService.userPermissions.some(
            permission =>
              !menuItem.requiredPermission ||
              permission === menuItem.requiredPermission,
          )
            ? [
                ...arr,
                {
                  ...menuItem,
                  children: getAccessibleItemsOnly(menuItem.children),
                } as MenuItem,
              ]
            : arr,
        [] as MenuItem[],
      );

      return filteredMenuItems;
    };

    const items = getAccessibleItemsOnly(this._defaultMenuItems);
    this._menuItems$.next(items);
  }
}
