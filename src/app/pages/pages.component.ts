import { Component } from '@angular/core';
import { IMenuService } from 'app/interfaces';
import { MenuItem } from 'app/models';
import { Observable } from 'rxjs';
import { MENU_ITEMS } from './pages-menu';


@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menuItems$ | async"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  menu = MENU_ITEMS;

  get menuItems$(): Observable<MenuItem[]> {
    return this._menuService.menuItems$;
  }

  constructor(private readonly _menuService: IMenuService) {
    // Each time go through this route, we need to rebuild menu items
    // because each use can view different menu items.
    _menuService.buildMenuItems();

  }
}
