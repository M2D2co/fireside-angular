import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { firebase, firebaseui, FirebaseUIModule } from 'firebaseui-angular';
import { SharedModule } from '../shared/shared.module';

// const firebaseUiAuthConfig: firebaseui.auth.Config = {
//   signInSuccessUrl: '/',
//   signInFlow: 'redirect',
//   signInOptions: [
//     {
//       provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//       customParameters: {
//         // Forces account selection even when one account is available.
//         prompt: 'select_account',
//       },
//     },
//     {
//       provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
//       requireDisplayName: false,
//     },
//   ],
//   credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
// };

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    // FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    SharedModule,
  ],
  providers: []
})
export class CoreModule { }
