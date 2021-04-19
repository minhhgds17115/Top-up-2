import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicModel } from '../../../models';
import { TopicService } from '../../../services';

@Component({
  selector: 'ngx-edit-topic',
  templateUrl: './edit-topic.component.html',
  styleUrls: ['edit-topic.component.scss'],
})
export class EditTopicComponent implements OnInit {
  model: TopicModel;
  disabled = false;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _topicService: TopicService,
  ) {}

  ngOnInit(): void {
    const { id } = this._route.snapshot.params;

    this._loadEntity(id);
  }

  onBack(): void {
    this._toTopicsPage();
  }

  onSubmit(model: TopicModel): void {
    this.disabled = true;
    this._topicService.create(model).subscribe(() => {
      this.disabled = false;
      this._toTopicsPage();
    });
  }

  private _toTopicsPage(): void {
    this._router.navigateByUrl('/pages/topics');
  }

  private _loadEntity(id: string): void {
    this.disabled = true;
    this._topicService.fetch(id).subscribe(model => {
      this.disabled = false;
      this.model = model;
    });
  }
}
