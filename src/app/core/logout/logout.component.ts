import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: '',
})
export class LogoutComponent {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
    auth.logout().then(() => {
      router.navigate(['/login']);
    });
  }

}
