import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule, HttpClientJsonpModule } from '@angular/common/http';

//  Routing
import { AppRoutingModule } from './app.routing';

// Services
import { AuthInterceptor } from './interceptors/auth-interceptor.service';

//  Modules
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

//  Angulartics
import { Angulartics2Module } from 'angulartics2';
import { ErrorService } from './services/error/error.service';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { ChatRoomComponent } from './chat/chat-room/chat-room.component';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { ChatService } from './chat/services/chat.service';

@NgModule({
  declarations: [
    AppComponent,
    ChatRoomComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    HttpClientJsonpModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    Angulartics2Module.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: ErrorHandler, useClass: ErrorService },
    AngularFireAuthGuard,
    ChatService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
