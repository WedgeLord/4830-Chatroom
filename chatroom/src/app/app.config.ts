import { ApplicationConfig } from '@angular/core';
import { importProvidersFrom } from "@angular/core";
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(HttpClientModule), provideRouter(routes, withComponentInputBinding())]
};
