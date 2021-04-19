import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ManageContributionModel } from 'app/models/contribution.model';
import { ManageContributionService } from '../manage-contribution.service';

@Component({
  selector: 'contributions-create',
  templateUrl: './manage-contribution-create.component.html',
  styleUrls: ['manage-contribution-create.component.scss'],
})
export class CreateContributionComponent {
  disabled = false;

  constructor(
    private readonly _router: Router,
    private readonly _contributionsService: ManageContributionService,
  ) {}

  onBack(): void {
    this._toContributionsPage();
  }

  onSubmit(model: ManageContributionModel): void {
    this.disabled = true;
    this._contributionsService.create(model).subscribe(() => {
      this.disabled = false;
      this._toContributionsPage();
    });
  }

  private _toContributionsPage(): void {
    this._router.navigateByUrl('/pages/contributions');
  }
}
