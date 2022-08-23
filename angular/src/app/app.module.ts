import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { ChatModule } from './chat/chat.module';
import firebaseConfig from '../firebase.config.json';

import { USE_EMULATOR as USE_EMULATOR_AUTH } from '@angular/fire/compat/auth';
import { USE_EMULATOR as USE_EMULATOR_FUNCTIONS } from '@angular/fire/compat/functions';
import { USE_EMULATOR as USE_EMULATOR_FIRESTORE } from '@angular/fire/compat/firestore';
import { USE_EMULATOR as USE_EMULATOR_STORAGE } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    ChatModule,
  ],
  providers: [
    AngularFireAuthGuard,
    //  To emulate Functions
    { provide: USE_EMULATOR_AUTH, useValue: environment.useEmulator ? ['localhost', 9099] : undefined },
    { provide: USE_EMULATOR_FIRESTORE, useValue: environment.useEmulator ? ['localhost', 8080] : undefined },
    { provide: USE_EMULATOR_FUNCTIONS, useValue: environment.useEmulator ? ['localhost', 5001] : undefined },
    { provide: USE_EMULATOR_STORAGE, useValue: environment.useEmulator ? ['localhost', 9199] : undefined },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
