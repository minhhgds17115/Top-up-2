export abstract class ICookieService {
  public abstract set(
    name: string,
    value: string,
    expires?: Date,
    path?: string,
  ): void;
  public abstract get<T>(name: string): T;
  public abstract remove(name: string, path?: string): void;
}
