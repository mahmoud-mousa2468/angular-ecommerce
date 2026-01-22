import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withHashLocation,
  withInMemoryScrolling,
} from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { headerInterceptor } from './core/interceptors/header.interceptor';
import { loadInterceptor } from './core/interceptors/load.interceptor';
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
