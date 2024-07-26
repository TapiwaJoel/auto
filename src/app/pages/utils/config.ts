import {InjectionToken} from '@angular/core';

export interface Config {
  apiUrl: string;
  prodAccess: string;
  authentication: string;
}

export const CONFIG: Config = {
  // apiUrl: 'http://192.168.57.72:8080/api/v1',
  // apiUrl: 'http://localhost:666/api/v1',
  // http://192.168.57.72:666/swagger-ui/index.html#/
  apiUrl: 'http://192.168.57.72:666/api/v1',
  prodAccess: 'prodAccess',
  authentication: 'authentication',
};

export const CONFIG_TOKEN = new InjectionToken<Config>('CONFIG_TOKEN',
  {
    providedIn: 'root',
    factory: () => CONFIG,
  });
