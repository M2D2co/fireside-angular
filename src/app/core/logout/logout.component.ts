import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: '',
})
export class LogoutComponent {

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
  ) {
    auth.signOut().then(() => {
      router.navigate(['/login']);
    });
  }

}
