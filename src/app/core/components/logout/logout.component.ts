import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'starter-logout',
  template: ''
})
export class LogoutComponent {

  constructor(
    authenticationService: AuthenticationService,
    router: Router
  ) {
    authenticationService.logout().then(() => {
      router.navigate(['/login']);
    });
  }

}
