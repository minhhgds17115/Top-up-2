import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ManageTopicModel } from '../../../models/managetopic.model';
import { ManageTopicService } from '../../../services/managetopic.service';

@Component({
  selector: 'ngx-create-mtopic',
  templateUrl: './create-manage-topic.component.html',
  styleUrls: ['create-manage-topic.component.scss'],
})
export class CreateManageTopicComponent {
  disabled = false;

  constructor(
    private readonly _router: Router,
    private readonly _managetopicService: ManageTopicService,
  ) {}

  onBack(): void {
    this._toManageTopicsPage();
  }

  onSubmit(model: ManageTopicModel): void {
    this.disabled = true;
    this._managetopicService.create(model).subscribe(() => {
      this.disabled = false;
      this._toManageTopicsPage();
    });
  }

  private _toManageTopicsPage(): void {
    this._router.navigateByUrl('/pages/manage-topics');
  }
}
