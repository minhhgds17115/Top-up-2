import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IConfigurationService } from 'app/interfaces';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ManageTopicModel } from '../models/managetopic.model';

@Injectable({
  providedIn: 'root',
})
export class ManageTopicService {
  constructor(
    private readonly _configurationService: IConfigurationService,
    private readonly _http: HttpClient,
  ) {}

  fetch(id: string): Observable<ManageTopicModel> {
    // TODO: map to model correctly
    return of<ManageTopicModel>({
      id,
      nametopic: 'fake name',
      namecoordinator: 'fake name',
      title: 'fake title',
      deadline: new Date(),
    }).pipe(delay(2000));
  }

  fetchAllTopics(): Observable<ManageTopicModel[]> {
    // TODO Uncomment these code when api exist.
    // return this._configurationService.apiEndpoint$.pipe(
    //   map(endpoint => `${endpoint}/topics`),
    //   switchMap(api => this._http.get<any[]>(api))
    // );

    return of<ManageTopicModel[]>([
      {
        id: '1',
        nametopic: 'Name of Topic',
        namecoordinator: 'Name of coordinator',
        title: 'Title of Topic',
        deadline: new Date(),
      },
      
    ]).pipe(delay(2000));
  }

  create(model: ManageTopicModel): Observable<any> {
    // TODO call to api instead
    return of('ok').pipe(delay(2000));
  }

  edit(model: ManageTopicModel): Observable<any> {
    // TODO call to api instead
    return of('ok').pipe(delay(2000));
  }

  delete(id: string): Observable<any> {
    // TODO call to api instead
    return of('ok').pipe(delay(2000));
  }
}
