import { InjectionToken } from '@angular/core';
import {AppConfig} from './iapp-config';

export let APP_CONFIG = new InjectionToken<AppConfig>("app.config");


export const TALENTED_DI_CONFIG: AppConfig = {
  apiUrl: 'http://127.0.0.1:8080/app_dev.php/',
  mockDataUrl: '/assets/mock-data/',
};
