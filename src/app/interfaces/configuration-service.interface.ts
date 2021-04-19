import { Observable } from 'rxjs';
import { Configuration } from '../models';

export abstract class IConfigurationService {
  abstract get config$(): Observable<Configuration>;

  abstract get apiEndpoint$(): Observable<string>;

  /**
   * Use load configuration in init time.
   */
  public abstract load(): Promise<boolean>;
}
