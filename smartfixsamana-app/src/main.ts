// src/main.ts
// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideRouter } from '@angular/router';
// import { AppComponent } from './app/app.component';
// import { routes } from './app/app.routes';
// import { importProvidersFrom } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideRouter(routes),
//     importProvidersFrom(HttpClientModule), provideAnimationsAsync()
//   ]
// }).catch(err => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './app/interceptors/token.interceptor'; 

bootstrapApplication(AppComponent, {
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    provideRouter(routes),
    importProvidersFrom(HttpClientModule,BrowserAnimationsModule)
  ]
}).catch(err => console.error(err));
