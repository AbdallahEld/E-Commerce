import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { headerInterceptor } from './header.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loaderInterceptor } from './loader.interceptor';
import { errorInterceptor } from './error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),

    provideHttpClient(withFetch(), withInterceptors([headerInterceptor, loaderInterceptor, errorInterceptor])),
    importProvidersFrom(RouterModule, BrowserAnimationsModule, NgxSpinnerModule, ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      closeButton: true
    }))
  ]
};
