import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageTopicModel } from '../../../models/managetopic.model';
import { ManageTopicService } from '../../../services/managetopic.service';

@Component({
  selector: 'ngx-edit-mtopic',
  templateUrl: './edit-mtopic.component.html',
  styleUrls: ['edit-mtopic.component.scss'],
})
export class EditManageTopicComponent implements OnInit {
  model: ManageTopicModel;
  disabled = false;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _topicService: ManageTopicService,
  ) {}

  ngOnInit(): void {
    const { id } = this._route.snapshot.params;

    this._loadEntity(id);
  }

  onBack(): void {
    this._toTopicsPage();
  }

  onSubmit(model: ManageTopicModel): void {
    this.disabled = true;
    this._topicService.create(model).subscribe(() => {
      this.disabled = false;
      this._toTopicsPage();
    });
  }

  private _toTopicsPage(): void {
    this._router.navigateByUrl('/pages/manage-topics');
  }

  private _loadEntity(id: string): void {
    this.disabled = true;
    this._topicService.fetch(id).subscribe(model => {
      this.disabled = false;
      this.model = model;
    });
  }
}
