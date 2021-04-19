import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageContributionModel } from 'app/models/contribution.model';
import { ManageContributionService } from '../manage-contribution.service';



@Component({
  selector: 'contribution-edit',
  templateUrl: './contribution-edit.component.html',
  styleUrls: ['contribution-edit.component.scss'],
})
export class EditContributionComponent implements OnInit {
  model: ManageContributionModel;
  disabled = false;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _ContributionService: ManageContributionService,
  ) {}

  ngOnInit(): void {
    const { id } = this._route.snapshot.params;

    this._loadEntity(id);
  }

  onBack(): void {
    this._toContributionsPage();
  }

  onSubmit(model: ManageContributionModel): void {
    this.disabled = true;
    this._ContributionService.create(model).subscribe(() => {
      this.disabled = false;
      this._toContributionsPage();
    });
  }

  private _toContributionsPage(): void {
    this._router.navigateByUrl('/pages/mange-contribution');
  }

  private _loadEntity(id: string): void {
    this.disabled = true;
    this._ContributionService.fetch(id).subscribe(model => {
      this.disabled = false;
      this.model = model;
    });
  }
}
