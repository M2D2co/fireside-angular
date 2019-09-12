import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication/authentication.service';


import { Observable } from 'rxjs';
import { from } from 'rxjs/observable/from';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return from(this.auth.getAuthorizationToken())
      .pipe(
        switchMap(token => {
          const headers = req.headers
            .set('Authorization', 'Bearer ' + token)
            .append('Content-Type', 'application/json');
          const reqClone = req.clone({ headers });
          return next.handle(reqClone);
        }));
  }

}
