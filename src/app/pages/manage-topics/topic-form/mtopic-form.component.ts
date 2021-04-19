import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ManageTopicModel } from 'app/models/managetopic.model';

@Component({
  selector: 'ngx-mtopic-form',
  templateUrl: './mtopic-form.component.html',
  styleUrls: ['mtopic-form.component.scss'],
})
export class TopicFormComponent {
  @Input() set data(value: ManageTopicModel) {
    if (value) {
      this.form.patchValue({
        nametopic: value.nametopic,
        namecoordinator: value.namecoordinator,
        title: value.title,
        deadline: new Date(value.deadline),
      });
    }
  }

  @Input() disabled = false;

  @Output() formSubmitted = new EventEmitter<ManageTopicModel>();

  readonly minDeadlineFrom = new Date();

  readonly form = new FormGroup({
    nametopic: new FormControl(null, [Validators.required]),
    namecoordinator: new FormControl(null, [Validators.required]),
    title: new FormControl(null, [Validators.required]),
    deadline: new FormControl(null, [Validators.required]),
  });

  onSubmit(): void {
    this.formSubmitted.emit(this.form.value);
  }
}
