import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  startYear = 2019;
  currentYear = new Date().getFullYear();
  user = this.auth.authState;

  constructor(
    private auth: AngularFireAuth,
  ) { }
}
