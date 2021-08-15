import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '@firebase/auth-types';
import { Observable } from 'rxjs';
import * as md5 from 'js-md5';
import { Profile } from '../models/profile.model';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

const DEFAULT_USER = 'Anonymous';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentProfile: Profile | null = null;
  public readonly profile: Observable<Profile | null> = this.auth.authState.pipe(
    switchMap(async user => {
      if (!user) {
        return null;
      } else if (this._currentProfile && this._currentProfile.uid === user.uid) {
        return this._currentProfile;
      } else {
        const profile = await this.buildProfile(user);
        this._currentProfile = profile;
        await this.db.collection('users').doc(profile.uid).set(profile, { merge: true });
        return profile;
      }
    })
  );

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
  ) { }

  logout(): Promise<void> {
    return this.auth.signOut();
  }

  private async buildProfile(user: User): Promise<Profile> {
    // Default to auth settings
    const profile = {
      uid: user.uid,
      displayName: user.displayName || '',
      avatarUrl: user.photoURL || '',
    };
    if (!profile.avatarUrl) {
      // Use the Gravatar URL
      profile.avatarUrl = `https://www.gravatar.com/avatar/${md5(user.email)}?s=64&d=identicon`;
    }
    if (!profile.displayName && user.email) {
      const username = user.email.match(/(.*?)@/);
      profile.displayName = username ? username[1] : '';
    }
    // Finally, user our default values
    if (!profile.displayName) {
      profile.displayName = DEFAULT_USER;
    }

    return profile;
  }

}
