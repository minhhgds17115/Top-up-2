import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { StringHelper } from '../helpers';
import { ICookieService } from '../interfaces';

@Injectable()
export class CookieService implements ICookieService {
  constructor(@Inject(DOCUMENT) private _document: Document) {}

  public set(name: string, value: string, expires?: Date, path?: string): void {
    let cookieString = `${name}=${value};`;

    if (expires) {
      cookieString += `expires=${expires.toUTCString()};`;
    }

    cookieString += `path=${path || '/'};`;

    this._document.cookie = cookieString;
  }

  public get<T>(name: string): T {
    // TODO: use regex will be better.
    let value: string;
    try {
      const deCookie = decodeURIComponent(this._document.cookie);

      const cookieString = deCookie
        .split(';')
        .find(cookie => StringHelper.contains(cookie, name));

      value = cookieString.split('=')[1];

      return JSON.parse(value.trim()) as T;
    } catch {
      return value === undefined || value === null ? undefined : (value as any);
    }
  }

  public remove(name: string, path?: string): void {
    // Set cookie `expires` to past will help us remove cookie value.
    this.set(name, '', new Date('Thu, 01 Jan 1970 00:00:01 GMT'), path);
  }
}
