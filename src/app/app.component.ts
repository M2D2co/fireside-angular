import { Component, OnInit } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { AuthenticationService } from './services/authentication/authentication.service';
import { Observable } from 'rxjs';
import { User } from 'firebase';

@Component({
  selector: 'starter-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  startYear = 2019;
  currentYear: number = new Date().getFullYear();
  user: Observable<User> = this.authenticationService.authInfo;

  constructor(
    angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
    private authenticationService: AuthenticationService
    ) {
      angulartics2GoogleAnalytics.startTracking();
  }

}
