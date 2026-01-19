import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withHashLocation,
  withInMemoryScrolling,
} from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { loadInterceptor } from './core/interceptors/load.interceptor';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { headerInterceptor } from './core/interceptors/header.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
      withHashLocation(),
    ),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([loadInterceptor, errorInterceptor, headerInterceptor]),
    ),
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(NgxSpinnerModule),
  ],
};
