import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TopicModel } from 'app/models/topic.model';

@Component({
  selector: 'ngx-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['topic-form.component.scss'],
})
export class TopicFormComponent {
  @Input() set data(value: TopicModel) {
    if (value) {
      this.form.patchValue({
        name: value.name,
        title: value.title,
        deadline: new Date(value.deadline),
      });
    }
  }

  @Input() disabled = false;

  @Output() formSubmitted = new EventEmitter<TopicModel>();

  readonly minDeadlineFrom = new Date();

  readonly form = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    title: new FormControl(null, [Validators.required]),
    deadline: new FormControl(null, [Validators.required]),
  });

  onSubmit(): void {
    this.formSubmitted.emit(this.form.value);
  }
}
