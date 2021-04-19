import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPermission } from 'app/enums';
import { RoutePermissionGuard } from 'app/guards';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateContributionComponent } from './manage-contribution/manage-contribution-create/manage-contribution-create.component';
import { ManageContributionComponent } from './manage-contribution/manage-contribution.component';
import { CreateManageTopicComponent } from './manage-topics/create-topic/create-manage-topic.component';
import { EditManageTopicComponent } from './manage-topics/edit-topic/edit-mtopic.component';
import { ManageTopicsComponent } from './manage-topics/managetopics.component';
import { PagesComponent } from './pages.component';
import { CreateTopicComponent } from './topics/create-topic/create-topic.component';
import { EditTopicComponent } from './topics/edit-topic/edit-topic.component';
import { MarkTopicComponent } from './topics/mark-topic/mark-topic.component';
import { TopicsComponent } from './topics/topics.component';
const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [RoutePermissionGuard],
        data: {
          permissions: {
            only: AppPermission.canAccessDashboardModule,
          },
        },
      },
      {
        path: 'topics',
        component: TopicsComponent,
        canActivate: [RoutePermissionGuard],
        data: {
          permissions: {
            only: AppPermission.canAccessDashboardModule,
          },
        },
      },
      {
        path: 'topics/create',
        component: CreateTopicComponent,
        // canActivate: [RoutePermissionGuard],
        // data: {
        //   permissions: {
        //     only: AppPermission.canAccessDashboardModule,
        //   },
        // },
      },
      {
        path: 'topics/:id',
        component: EditTopicComponent,
        // canActivate: [RoutePermissionGuard],
        // data: {
        //   permissions: {
        //     only: AppPermission.canAccessDashboardModule,
        //   },
        // },
      },
      {
        path: 'topics/mark/:id',
        component: MarkTopicComponent,
      },  
      {
        path: 'contributions',
        component: ManageContributionComponent,
      },
      {
        path: 'contributions/create',
        // TODO: use component that allow create contribution
        component: CreateContributionComponent,
      },
      {
        path: 'contributions/:id',
        // TODO: use component that allow edit contribution
        component: EditTopicComponent,
      },
      {
        path: 'manage-topics',
        component: ManageTopicsComponent,
        canActivate: [RoutePermissionGuard],
        data: {
          permissions: {
            only: AppPermission.canAccessDashboardModule,
          },
        },
      },
      {
        path: 'manage-topics/create',
        // TODO: use component that allow create contribution
        component: CreateManageTopicComponent,
      },
      {
        path: 'manage-topics/:id',
        // TODO: use component that allow edit contribution
        component: EditManageTopicComponent,
      },

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
