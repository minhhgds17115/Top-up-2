import { NgModule } from '@angular/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SharedModule } from '../../modules';
import { CreateTopicComponent } from './create-topic/create-topic.component';
import { EditTopicComponent } from './edit-topic/edit-topic.component';
import { MarkTopicComponent } from './mark-topic/mark-topic.component';
import { TopicFormComponent } from './topic-form/topic-form.component';
import { TopicsComponent } from './topics.component';

@NgModule({
  imports: [SharedModule, NgxPermissionsModule.forChild()],
  declarations: [
    TopicsComponent,
    EditTopicComponent,
    MarkTopicComponent,
    CreateTopicComponent,
    TopicFormComponent,
  ],
})
export class TopicsModule {}
