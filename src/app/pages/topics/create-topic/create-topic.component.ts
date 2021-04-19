import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TopicModel } from '../../../models/topic.model';
import { TopicService } from '../../../services';

@Component({
  selector: 'ngx-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['create-topic.component.scss'],
})
export class CreateTopicComponent {
  disabled = false;

  constructor(
    private readonly _router: Router,
    private readonly _topicService: TopicService,
  ) {}

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
}
