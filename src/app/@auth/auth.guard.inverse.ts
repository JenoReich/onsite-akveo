import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class AuthGuardInverse implements CanActivate {
  constructor(private authService: NbAuthService, private router: Router 
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (authenticated) {
            this.router.navigate(['']);
          }
        }),
        map<boolean, boolean>(value => !value)
      );
  }
}