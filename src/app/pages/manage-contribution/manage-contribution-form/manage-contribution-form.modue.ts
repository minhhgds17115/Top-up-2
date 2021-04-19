import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ManageContributionModel } from 'app/models/contribution.model';

@Component({
  selector: 'manage-contribution-form',
  templateUrl: './manage-contribution-form.component.html',
  styleUrls: ['manage-contribution-form.component.scss'],
})
export class ManageContributionFormComponent {
  @Input() set data(value: ManageContributionModel) {
    if (value) {
      this.form.patchValue({
        name: value.name,
        
        topic: value.topic,
      });
    }
  }

  @Input() disabled = false;

  @Output() formSubmitted = new EventEmitter<ManageContributionModel>();

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
