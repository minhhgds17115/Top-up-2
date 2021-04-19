import { DatePipe } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ManageTopicModel } from 'app/models';
import { ManageTopicService } from 'app/services';
import { AppPermission } from '../../enums';

@Component({
  selector: 'manage-ngx-topics',
  templateUrl: './managetopics.component.html',
  styleUrls: ['./managetopics.component.scss'],
})
export class ManageTopicsComponent {
  disabled = false;
  @ViewChild('deleteDialogRef') public _deleteDialogRef: TemplateRef<any>;
  public readonly permissions = AppPermission;

  public readonly settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        {
          name: 'edit',
          title: '<i class="nb-edit custom-icon" title="Edit"></i>',
        },
        {
          name: 'delete',
          title: '<i class="nb-trash custom-icon" title="Delete"></i>',
        },
      ],
    },

    columns: {
      nametopic: {
        title: 'NameTopic',
      },
      namecoordinator:{
        title: 'NameCoordinator',
      },
      title: {
        title: 'Title',
      },
      deadline: {
        title: 'Deadline',

        valuePrepareFunction: (date: Date) => {
          if (date) {
            return this._datePipe.transform(date, 'yyyy-MM-dd hh:mm aa');
          }
          return null;
        },
      },
    },
  };

  public source: ManageTopicModel[] = [];

  constructor(
    private readonly _router: Router,
    private readonly _dialogService: NbDialogService,
    private readonly _topicService: ManageTopicService,
    private readonly _datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.loadAllEntities();
  }

  onCreate(): void {
    this._router.navigate(['pages', 'manage-topics', 'create']);
  }

  onCustom(event: any): void {
    const { action, data } = event;

    switch (action.toLowerCase()) {
      case 'edit':
        this._onEdit(data);
        break;
      case 'delete':
        this._onDelete(data);
        break;

      default:
        break;
    }
  }

  private _onEdit(row: ManageTopicModel): void {
    this._router.navigate(['pages', 'manage-topics', row.id]);
  }

  private _onDelete(row: ManageTopicModel): void {
    this._dialogService
      .open(this._deleteDialogRef, {
        context: row,
      })
      .onClose.subscribe(confirmed => {
        if (confirmed) {
          this._topicService.delete(row.id);
          this.loadAllEntities();
        }
      });
    // this._deleteDialogRef.alert(`Delete triggered at row ${row.id}`);
  }

  private loadAllEntities(): void {
    this.disabled = true;
    this.source = [];
    this._topicService.fetchAllTopics().subscribe(rows => {
      this.source = rows;
      this.disabled = false;
    });
  }
}
