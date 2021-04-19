import { DatePipe } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ManageContributionModel } from 'app/models/contribution.model';
import { AppPermission } from '../../enums';
import { ManageContributionService } from './manage-contribution.service';

@Component({
    selector: 'manage-contribution',
    templateUrl: './manage-contribution.component.html',
    styleUrls:['./manage-contribution.component.scss'] ,
  })
export class ManageContributionComponent {
  disabled = false;
  @ViewChild('deleteDialogRef') public _deleteDialogRef: TemplateRef<any>;
  @ViewChild('downloadDialogRef') public _downoadDialogRef: TemplateRef<any>;
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
        {
          name: 'download',
          title: '<i class="fa fa-download" aria-hidden="true"></i>',
        }
      ],
    },

    columns: {
      name: {
        title: 'Name',
      },
      title: {
        title: 'Title',
      },
      Contribution: { 
        title:'Contribution',

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
      coordinator: {
        title: 'Coordinator',
      }
    },
  };

  public source: ManageContributionModel[] = [];

  constructor(
    private readonly _router: Router,
    private readonly _dialogService: NbDialogService,
    private readonly _manageContribution: ManageContributionService,
    private readonly _datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.loadAllEntities();
  }

  onCreate(): void {
    this._router.navigate(['pages', 'contributions', 'create']);
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
      case 'download':
      this._onDownload(data);

      default:
        break;
    }
  }
 

  private _onEdit(row: ManageContributionModel): void {
    this._router.navigate(['pages', 'Contributions', row.id]);
  }

  private _onDelete(row: ManageContributionModel): void {
    this._dialogService
      .open(this._deleteDialogRef, {
        context: row,
      })
      .onClose.subscribe(confirmed => {
        if (confirmed) {
          this._manageContribution.delete(row.id);
          this.loadAllEntities();
        }
      });
    // this._deleteDialogRef.alert(`Delete triggered at row ${row.id}`);
  }
  private _onDownload(row: ManageContributionModel): void {
    this._dialogService
      .open(this._downoadDialogRef, {
        context: row,
      })
      .onClose.subscribe(confirmed => {
        if (confirmed) {
          this._manageContribution.delete(row.id);
          this.loadAllEntities();
        }
      });
  }


  private loadAllEntities(): void {
    this.disabled = true;
    this.source = [];
    this._manageContribution.fetchAllContributions().subscribe(rows => {
      this.source = rows;
      this.disabled = false;
    });
  }
}
