import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NB_AUTH_OPTIONS, NbAuthService, NbAuthResult } from '@nebular/auth';
import { getDeepFromObject } from './helpers';

@Injectable()
export class AuthHttpRequestInterceptor implements HttpInterceptor {
  redirectDelay: number = this.getConfigValue('forms.logout.redirectDelay');
  strategy: string = this.getConfigValue('forms.logout.strategy');

  constructor(
    protected authService: NbAuthService,
    private router: Router,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
          "Authorization-X": req.headers.getAll('Authorization') ? req.headers.getAll('Authorization') : '',
      },
      withCredentials: true
    });

    return next.handle(req)
      .pipe(catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.clear();
          this.authService.logout(this.strategy).subscribe((result: NbAuthResult) => {
      
            const redirect = result.getRedirect();
            if (redirect) {
              setTimeout(() => {
                return this.router.navigateByUrl(redirect);
              }, this.redirectDelay);
            }
          });
      
          this.router.navigate(['auth/login']);
        }
        // TODO: handle 403 error ?
        return throwError(error);
      }));
  }


  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

}