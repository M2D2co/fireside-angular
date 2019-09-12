import { Injectable } from '@angular/core';
import * as md5 from 'js-md5';
import * as firebase from 'firebase/app';

// Import Observable
import { Observable, throwError, BehaviorSubject } from 'rxjs';

// Import Firebase and AngularFire
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { Profile } from '../../models/user';
import { flatMap, tap } from 'rxjs/operators';
import { User } from 'firebase/app';
import { Provider } from '@angular/compiler/src/compiler_facade_interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public authInfo: Observable<User>;

  private socialProviders = {
    'google.com': new firebase.auth.GoogleAuthProvider(),
    facebook: new firebase.auth.FacebookAuthProvider(),
    github: new firebase.auth.GithubAuthProvider()
  };

  constructor(
    private afAuth: AngularFireAuth,
    private http: HttpClient,
    private db: AngularFireDatabase
  ) {
    this.authInfo = this.afAuth.user;
  }

  public async updateUserProfile(user: User): Promise<void | Observable<void>> {
    const _userName = user.email.match(/(.*?)@/);
    const profile: Profile = {
      email: user.email,
      photoUrl: user.photoURL || null,
      displayName: user.displayName || _userName[1],
      uid: user.uid,
      updated: user.metadata.lastSignInTime,
      provider: user.providerId
    };
    await this.db.object(`/users/${user.uid}`).update(profile);
    if (user.providerId === 'emailAndPassword') {
      return this.getGravitar(profile);
    }
  }

  getGravitar(profile: Profile) {
    const hash = md5(profile.email);
    profile.photoUrl = `https://www.gravatar.com/avatar/${hash}?s=64&d=identicon`;
    const profileUrl = `https://www.gravatar.com/${hash}.json`;

    return this.http.jsonp(profileUrl, 'callback')
    .pipe(flatMap(
      (gravitarProfile: any) => this.db.object(`/users/${profile.uid}/displayName`).update(gravitarProfile.entry[0].displayName)
    ));
  }

  logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  updateEmail(user: User, email: string): Promise<void> {
    return user.updateEmail(email);
  }

  updatePassword(user: User, password: string): Promise<void> {
    return user.updatePassword(password);
  }

  linkAccount(user: User, providerId: string): Promise<firebase.auth.UserCredential> {
    console.log(this.socialProviders[providerId], providerId);
    return user.linkWithPopup(this.socialProviders[providerId]);
  }

  unlinkAccount(user: User, providerId: string): Promise<User> {
    return user.unlink(providerId);
  }

  deleteAccount(user: User) {
    return user.delete();
  }

  async getAuthorizationToken() {
    const user: any = firebase.auth().currentUser;
    try {
      const token = await user.getIdToken(true);
      return token;
    } catch (err) {
      console.error('error fetching token', err);
    }
  }

  reauthenticate(user: User): Promise<firebase.auth.UserCredential> {
    return user.reauthenticateWithPopup(this.socialProviders[user.providerData[0].providerId]);
  }
}
