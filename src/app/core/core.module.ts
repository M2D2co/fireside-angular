import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

//  Components
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoginComponent } from './components/login/login.component';
import { ContactComponent } from './components/contact/contact.component';

// Services
import { AuthenticationService } from '../services/authentication/authentication.service';
import { AuthGuardService } from '../guards/auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  imports: [ SharedModule ],
  providers: [ AuthenticationService, AuthGuardService ],
  declarations: [
    AccessDeniedComponent,
    ContactComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    UserProfileComponent,
    PageNotFoundComponent
  ],
  exports: [ ],
  entryComponents: [ ]
})
export class CoreModule {}
