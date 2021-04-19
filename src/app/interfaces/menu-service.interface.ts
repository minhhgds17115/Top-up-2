import { Observable } from 'rxjs';
import { MenuItem } from '../models';


export abstract class IMenuService {
  abstract get menuItems$(): Observable<MenuItem[]>;

  public abstract buildMenuItems(): void;
}
