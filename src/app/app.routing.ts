import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccessDeniedComponent } from './core/components/access-denied/access-denied.component';
import { ContactComponent } from './core/components/contact/contact.component';
import { HomeComponent } from './core/components/home/home.component';
import { LogoutComponent } from './core/components/logout/logout.component';
import { UserProfileComponent } from './core/components/user-profile/user-profile.component';
import { LoginComponent } from './core/components/login/login.component';

import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { ChatRoomComponent } from './chat/chat-room/chat-room.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [AngularFireAuthGuard]},
  { path: 'chat', component: ChatRoomComponent, canActivate: [AngularFireAuthGuard]},
  { path: 'contact', component: ContactComponent },
  { path: '401', component: AccessDeniedComponent },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

