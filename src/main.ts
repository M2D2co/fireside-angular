import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Initialize Google Analytics
if (environment.google.trackingId) {
  window['ga']('create', environment.google.trackingId, 'auto');
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
