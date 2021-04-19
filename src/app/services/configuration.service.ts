import { HttpBackend, HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CONFIG_URL } from 'app/token';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IConfigurationService } from '..//interfaces';
import { Configuration } from '../models';



@Injectable()
export class ConfigurationService implements IConfigurationService {
  private _http: HttpClient;

  get config$(): Observable<Configuration> {
    return this._config$;
  }

  get apiEndpoint$(): Observable<string> {
    return this._config$.pipe(map(({ apiEndpoint }) => apiEndpoint));
  }

  private _config$: Observable<Configuration>;

  constructor(
    _httpBackend: HttpBackend,
    @Inject(CONFIG_URL) private _configUrl: string,
  ) {
    this._http = new HttpClient(_httpBackend);
  }

  public load(): Promise<boolean> {
    return this._http
      .get<Configuration>(this._configUrl)
      .pipe(
        tap(
          data =>
            (this._config$ = of({
              apiEndpoint: data.apiEndpoint,
            } as Configuration)),
        ),
        map(data => !!data),
      )
      .toPromise();
  }
}
