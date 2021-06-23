import { Component } from '@angular/core';
import { FirebaseuiAngularLibraryService, FirebaseUISignInFailure } from 'firebaseui-angular';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    public snackBar: MatSnackBar,
    // private firebaseuiAngularLibraryService: FirebaseuiAngularLibraryService,
  ) {
    // this.firebaseuiAngularLibraryService.firebaseUiInstance.disableAutoSignIn();
  }

  handleError(errorData: FirebaseUISignInFailure) {
    this.snackBar.open(errorData.code, 'Close', {
      duration: 5000,
      panelClass: ['snackbar-error']
    });
  }

}
