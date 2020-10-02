import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase/app';
// Attach firebase to window so FirebaseUI can access it
(<any>window).firebase = firebase;

// Import FirebaseUI standalone (as its npm.js file causes double firebase code)
import 'firebaseui/dist/firebaseui';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

// Declare `window.firebaseui` that the above import creates
declare global { const firebaseui; }

@Component({
  selector: 'starter-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements AfterViewInit {

  ui;
  @ViewChild('uiContainer') uiContainer: HTMLElement;
  uiConfig = {
    signInSuccessUrl: '/',
    signInFlow: 'redirect',
    credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
    signInOptions: [
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        customParameters: {
          // Forces account selection even when one account is available.
          prompt: 'select_account'
        }
      },
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false
      }
    ],
    callbacks: {
      signInSuccessWithAuthResult: async(authResult, redirectUrl) => {
        // Do something with the returned AuthResult.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        this.authenticationService.updateUserProfile(authResult.user);
        return false;
      },
      signInFailure: function(error) {
        console.error('error', error);
        // Some unrecoverable error occurred during sign-in.
        // Return a promise when error handling is completed and FirebaseUI
        // will reset, clearing any UI. This commonly occurs for error code
        // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
        // occurs. Check below for more details on this.
        return this.handleUIError(error);
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        // document.getElementById('loader').style.display = 'none';
      }
    }
  };

  constructor(
    private af_auth: AngularFireAuth,
    public snackBar: MatSnackBar,
    public router: Router,
    public route: ActivatedRoute,
    public authenticationService: AuthenticationService
  ) {}

  handleUIError(error) {
    this.snackBar.open(error.message, null, {
      duration: 5000,
      panelClass: [ 'snackbar-error' ]
    });
  }

  async ngAfterViewInit () {
    let _ui = firebaseui.auth.AuthUI.getInstance();
    if (_ui) { await firebaseui.auth.AuthUI.getInstance().delete(); }
    // For iOS full screen apps we use the redirect auth mode.
    if (this.af_auth.auth) {
      this.ui = new firebaseui.auth.AuthUI(this.af_auth.auth);
      this.ui.start('#firebaseui-auth-container', this.uiConfig);
      _ui = firebaseui.auth.AuthUI.getInstance();
    }
  }

}
