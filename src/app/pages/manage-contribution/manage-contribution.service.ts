import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IConfigurationService } from 'app/interfaces';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ManageContributionModel } from '../../models/contribution.model';

@Injectable({
  providedIn: 'root',
})
export class ManageContributionService {
  constructor(
    private readonly _configurationService: IConfigurationService,
    private readonly _http: HttpClient,
  ) {}

  fetch(id: string): Observable<ManageContributionModel> {
    // TODO: map to model correctly
    return of<ManageContributionModel>({
      id,
      name: 'fake name',
      title: 'fake title',
      topic: 'Topic',
      Contributions: 'Contributions',
      deadline: new Date(),
      Coordinators: 'Coordinator',
    }).pipe(delay(2000));
  }

  fetchAllContributions(): Observable<ManageContributionModel[]> {
    // TODO Uncomment these code when api exist.
    // return this._configurationService.apiEndpoint$.pipe(
    //   map(endpoint => `${endpoint}/topics`),
    //   switchMap(api => this._http.get<any[]>(api))
    // );

    return of<ManageContributionModel[]>([
      {
        id: '1',
        name: 'Name of student',
        topic: 'name of topic',
        title: 'Title of Topic',
        Contributions: 'Student contribution',
        deadline: new Date(),
        Coordinators: 'Coordinator',
      },
      {
        id: '1',
        name: 'Name of Topic 2',
        topic: 'name of topic',
        title: 'Title of Topic 2',
        Contributions: 'Student contribution',
        deadline: new Date(),
        Coordinators: 'Coordinator',
      },
      {
        id: '3',
        name: 'Name of Topic 3',
        topic: 'name of topic',
        title: 'Title of Topic 3',
        Contributions: 'Student contribution',
        deadline: new Date(),
        Coordinators: 'Coordinator',
      },
      {
        id: '4',
        name: 'Name of Topic 4',
        topic: 'name of topic',
        title: 'Title of Topic 4',
        Contributions: 'Student contribution',
        deadline: new Date(),
        Coordinators: 'Coordinator',
      },
    ]).pipe(delay(2000));
  }

  create(model: ManageContributionModel): Observable<any> {
    // TODO call to api instead
    return of('ok').pipe(delay(2000));
  }

  edit(model: ManageContributionModel): Observable<any> {
    // TODO call to api instead
    return of('ok').pipe(delay(2000));
  }

  delete(id: string): Observable<any> {
    // TODO call to api instead
    return of('ok').pipe(delay(2000));
  }
  download(id: string): Observable<any>{
    return of('ok').pipe(delay(2000));
  }

}
