import { NgModule } from '@angular/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SharedModule } from '../../modules';
import { CreateContributionComponent } from './manage-contribution-create/manage-contribution-create.component';
import { EditContributionComponent } from './manage-contribution-edit/contribution-edit.component';
import { ManageContributionFormComponent } from './manage-contribution-form/manage-contribution-form.modue';
import { ManageContributionComponent } from './manage-contribution.component';

@NgModule({
    imports: [SharedModule, NgxPermissionsModule.forChild()],
    declarations: [
      ManageContributionComponent,
      ManageContributionFormComponent,
      CreateContributionComponent,
      EditContributionComponent,
      
    ],
  })
  export class ManageContributionModule {}