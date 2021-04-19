import { NgModule } from '@angular/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SharedModule } from '../../modules';
import { CreateManageTopicComponent } from './create-topic/create-manage-topic.component';
import { EditManageTopicComponent } from './edit-topic/edit-mtopic.component';
import { ManageTopicsComponent } from './managetopics.component';
import { TopicFormComponent } from './topic-form/mtopic-form.component';

@NgModule({
  imports: [SharedModule, NgxPermissionsModule.forChild()],
  declarations: [
    ManageTopicsComponent,
    EditManageTopicComponent,
    CreateManageTopicComponent,
    TopicFormComponent,
    
  ],
})
export class ManageTopicsModule {}
