import { Component } from '@angular/core';
import { AppPermission } from '../../enums';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  public readonly permissions = AppPermission;
}
