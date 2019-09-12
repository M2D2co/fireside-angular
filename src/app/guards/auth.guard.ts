import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate(): boolean {
    const uid = localStorage.getItem('uid');
    if (uid && uid !== 'null') {
      return !!localStorage.getItem('uid');
    } else {
      this.router.navigate(['/login']);
    }
  }

}
