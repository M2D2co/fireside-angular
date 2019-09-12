import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { User } from 'firebase';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailRegex, HelperService } from '../../../services/helper/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'starter-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  user: User;
  destroyed$: Subject<boolean> = new Subject();
  emailForm: FormGroup;
  passwordForm: FormGroup;
  deleleteAccountForm: FormGroup;
  type: 'password' | 'string' = 'password';
  providersById: string[] = ['google.com', 'password'];
  availableProviders: string[] = [];
  hasEmailPassword: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private helperService: HelperService,
    private router: Router
  ) {
    this.createForms();
  }

  ngOnInit() {
    this.authenticationService.authInfo.pipe(takeUntil(this.destroyed$)).subscribe(user => {
      this.user = user;
      this.configureForView(user);
    });
  }

  configureForView(user: User) {
    this.passwordForm.patchValue({ email: user.email });
    const linkedProviders = user.providerData.map(provider => provider.providerId);
    this.availableProviders = this.providersById.filter(
      providerId => providerId !== 'password' && !linkedProviders.find(linkedProvider => linkedProvider === providerId)
    );
    this.hasEmailPassword = !!user.providerData.find(provider => provider.providerId === 'password');
  }

  createForms() {
    this.emailForm = this.fb.group({
      email: [ null, [Validators.pattern(EmailRegex)]]
    });
    this.passwordForm = this.fb.group({
      email: [ null ],
      password: [ null, [ Validators.minLength(8) ]]
    });
    this.deleleteAccountForm = this.fb.group({
      confirm: [ null, [Validators.required, Validators.pattern('^DELETE$')] ]
    });
  }

  updateEmail() {
    this.authenticationService.updateEmail(this.user, this.emailForm.value.email)
    .then(
      () => {
        this.helperService.handleSuccess('Email address has been updated.');
        this.emailForm.reset();
      },
      error => this.handleError(error, () => this.updateEmail())
    );
  }

  updatePassword() {
    this.authenticationService.updatePassword(this.user, this.passwordForm.value.password)
    .then(
      () => {
        this.helperService.handleSuccess('Password address has been updated.');
        this.passwordForm.reset();
        this.hasEmailPassword = true;
      },
      error => this.handleError(error, () => this.updatePassword())
    );
  }

  getHumanReadableProvider(providerId: string): string {
    switch (providerId) {
      case 'password':
        return 'Email & Password';
        break;
      case 'google.com':
        return 'Google';
        break;
      default:
        return providerId;
    }
  }

  unlinkAccount(providerId: string) {
    this.authenticationService.unlinkAccount(this.user, providerId)
    .then(user => {
      this.helperService.handleSuccess('Account Successfully Unlinked.');
      this.configureForView(user);
    }, error => this.handleError(error, () => this.unlinkAccount(providerId)));
  }

  linkAccount(providerId: string) {
    this.authenticationService.linkAccount(this.user, providerId)
    .then(userCredentials => {
      this.helperService.handleSuccess('Account Successfully Linked.');
      this.configureForView(userCredentials.user);
    }, error => this.handleError(error, () => this.linkAccount(providerId)));
  }

  deleteAccount() {
    this.authenticationService.deleteAccount(this.user)
    .then(() => {
      this.router.navigate(['/login']);
    },
    error => this.handleError(error, () => this.deleteAccount()));
  }

  toggleType() {
    this.type = this.type === 'password' ? 'string' : 'password';
  }

  handleError(error: { code: string, message: string}, fn: Function) {
    if (error.code === 'auth/requires-recent-login') {
      this.authenticationService.reauthenticate(this.user)
      .then(() => fn());
    } else {
      this.helperService.handleError(error.message);
    }
    console.log(error);
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
