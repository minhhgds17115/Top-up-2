import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IConfigurationService } from 'app/interfaces';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { TopicModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  constructor(
    private readonly _configurationService: IConfigurationService,
    private readonly _http: HttpClient,
  ) {}

  fetch(id: string): Observable<TopicModel> {
    // TODO: map to model correctly
    return of<TopicModel>({
      id,
      name: 'fake name',
      namestudent: 'fake name',
      title: 'fake title',
      deadline: new Date(),
    }).pipe(delay(2000));
  }

  fetchAllTopics(): Observable<TopicModel[]> {
    // TODO Uncomment these code when api exist.
    // return this._configurationService.apiEndpoint$.pipe(
    //   map(endpoint => `${endpoint}/topics`),
    //   switchMap(api => this._http.get<any[]>(api))
    // );

    return of<TopicModel[]>([
      {
        id: '1',
        name: 'Name of Topic',
        namestudent: 'Name of student',
        title: 'Title of Topic',
        deadline: new Date(),
      },
      {
        id: '1',
        name: 'Name of Topic 2',
        namestudent: 'Name of student',
        title: 'Title of Topic 2',
        deadline: new Date(),
      },
      {
        id: '3',
        name: 'Name of Topic 3',
        namestudent: 'Name of student',
        title: 'Title of Topic 3',
        deadline: new Date(),
      },
      {
        id: '4',
        name: 'Name of Topic 4',
        namestudent: 'Name of student',
        title: 'Title of Topic 4',
        deadline: new Date(),
      },
    ]).pipe(delay(2000));
  }

  create(model: TopicModel): Observable<any> {
    // TODO call to api instead
    return of('ok').pipe(delay(2000));
  }

  edit(model: TopicModel): Observable<any> {
    // TODO call to api instead
    return of('ok').pipe(delay(2000));
  }
  mark(model: TopicModel): Observable<any> {
    // TODO call to api instead
    return of('ok').pipe(delay(2000));
  }

  delete(id: string): Observable<any> {
    // TODO call to api instead
    return of('ok').pipe(delay(2000));
  }
}
