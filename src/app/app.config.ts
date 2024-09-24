import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {HttpClient, provideHttpClient} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import {provideState, provideStore} from '@ngrx/store';
import {authReducer} from "./store/auth/auth.reducer";


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom(TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })),
    provideCharts(withDefaultRegisterables()),
    provideStore(),
    provideState('auth', authReducer),
  ]
};
