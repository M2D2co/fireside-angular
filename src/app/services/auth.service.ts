import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '@firebase/auth-types';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import * as md5 from 'js-md5';
import { GravatarProfile, GravatarResponse } from '../models/gravatar.model';
import { Profile } from '../models/profile.model';
import { map, switchMap, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

const DEFAULT_USER = 'Anonymous';
const DEFAULT_AVATAR = '/assets/icons/user.svg';

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
        console.log('saving profile ...', profile);
        await this.db.collection('users').doc(profile.uid).set(profile, { merge: true });
        console.log('profile saved');
        return profile;
      }
    })
  );

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private http: HttpClient,
  ) { }

  private async buildProfile(user: User): Promise<Profile> {
    // Default to auth settings
    const profile = {
      uid: user.uid,
      displayName: user.displayName || '',
      avatarUrl: user.photoURL || '',
    };
    console.log('buildProfile', profile);
    if (!profile.displayName || !profile.avatarUrl) {
      // Enrich with Gravatar, if possible
      const gravatarProfile = user.email ? await this.getGravatar(user.email) : null;
      if (gravatarProfile) {
        if (gravatarProfile.displayName && !user.displayName) {
          profile.displayName = gravatarProfile.displayName;
        }
        if (gravatarProfile.thumbnailUrl && !user.photoURL) {
          profile.avatarUrl = gravatarProfile.thumbnailUrl;
        }
      }
      // Build a display name from email, if necessary
      if (!profile.displayName && user.email) {
        const username = user.email.match(/(.*?)@/);
        profile.displayName = username ? username[1] : '';
      }
      // Finally, user our default values
      if (!profile.displayName) {
        profile.displayName = DEFAULT_USER;
      }
      if (!profile.avatarUrl) {
        profile.avatarUrl = DEFAULT_AVATAR;
      }
    }

    return profile;
  }

  private async getGravatar(email: string): Promise<GravatarProfile | null> {
    const hash = md5(email);
    // const photoUrl = `https://www.gravatar.com/avatar/${hash}?s=64&d=identicon`;
    const profileUrl = `https://www.gravatar.com/${hash}.json`;

    try {
      const response = await this.http.get<GravatarResponse>(profileUrl).toPromise();
      return response.entry[0];
    } catch (e) {
      console.warn('Unable to load Gravatar', e);
      return null;
    }
  }

  public async updateUserProfile(user: User | null): Promise<Profile | null> {
    console.log('updateUserProfile', user);
    // if (!user) {
    //   this._profile.next(null);
    //   return null;
    // }
    const profile = await this.buildProfile(user);
    console.log('built profile', profile);
    await this.db.collection('users').doc(user.uid).set(profile, { merge: true });
    console.log('created user profile', profile);
    // this._profile.next(profile);
    console.log('returning profile', profile);
    return profile;
  }

}
