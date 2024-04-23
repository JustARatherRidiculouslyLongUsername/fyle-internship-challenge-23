import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { CachingInterceptor } from './app/cache/cache-interceptor';
import { CacheService } from './app/cache/cache.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    [{ provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }],
    { provide: Cache, useClass: CacheService },
    importProvidersFrom(BrowserAnimationsModule),
    provideRouter(routes),
  ],
});
