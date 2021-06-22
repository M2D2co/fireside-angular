import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseuiAngularLibraryService, FirebaseUISignInSuccessWithAuthResult, FirebaseUISignInFailure } from 'firebaseui-angular';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    public snackBar: MatSnackBar,
    private authSvc: AuthService,
    private firebaseuiAngularLibraryService: FirebaseuiAngularLibraryService,
  ) {
    this.firebaseuiAngularLibraryService.firebaseUiInstance.disableAutoSignIn();
  }

  async handleSuccess(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    console.log('login', signInSuccessData.redirectUrl, signInSuccessData.authResult);
    // await this.authSvc.updateUserProfile(signInSuccessData.authResult.user);
  }

  handleError(errorData: FirebaseUISignInFailure) {
    console.log('login error', errorData);
    this.snackBar.open(errorData.code, 'Close', {
      duration: 5000,
      panelClass: ['snackbar-error']
    });
  }

}
