import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { Mock } from 'ts-mocks';
import { User } from 'firebase';
import { of } from 'rxjs';
import { FirebaseAuth } from '@angular/fire';

const user = {
  uid: '-allaksdlfiddsfj'
} as User;

const auth = {
  signInWithPopup: () => { of(user); },
  signOut: () => {}
} as any as FirebaseAuth;

describe('AuthenticationService', () => {
  beforeEach(() => {
    const mockAngularFireAuth = new Mock<AngularFireAuth>();
    mockAngularFireAuth.setup(o => o.authState).is(of(user));
    mockAngularFireAuth.setup(o => o.auth).is(auth);
    TestBed.configureTestingModule({
      imports: [ HttpClientModule],
      providers: [
        AuthenticationService,
        { provide: AngularFireAuth, useValue: mockAngularFireAuth.Object },
      ]
    });
  });

  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
