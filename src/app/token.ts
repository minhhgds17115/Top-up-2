import { InjectionToken } from '@angular/core';

export const CONFIG_URL = new InjectionToken<string>(
  'Configuration file location',
);

export const JWT_TOKEN = new InjectionToken<string>(
  'jwt token key that will be saved in cookie',
);
