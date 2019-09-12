import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

@Injectable()
export class ErrorService implements ErrorHandler {

  constructor(
    private injector: Injector
  ) { }


  handleError(error: Error) {
    const analytics = this.injector.get(Angulartics2);
    console.warn(error);

    analytics.eventTrack.next({
      action: 'Error',
      properties: {
        category: error.name,
        label: error.message
      }
    });

    analytics.exceptionTrack.next({ fatal: true, description: error.message });
  }
}
