import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { User } from 'firebase';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { takeUntil } from 'rxjs/operators';

class Chat {
  content: string;
  displayName: string;
  photoURL?: string;
  timestamp: Date;
  uid: string;
}

@Component({
  selector: 'starter-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
  destroyed$: Subject<boolean> = new Subject();

  currentUser: User;
  chatForm: FormGroup;
  chats: Observable<Chat[]>;

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private db: AngularFireDatabase,
  ) {
    this.chatForm = this.fb.group({
      content: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.authenticationService.authInfo.pipe(takeUntil(this.destroyed$)).subscribe(user => {
      this.currentUser = user;
    });

    this.chats = this.db.list<Chat>('chats').valueChanges().pipe(takeUntil(this.destroyed$));
  }

  sendChat() {
    const chat: Chat = {
      content: this.chatForm.get('content').value(),
      timestamp: new Date(),
      uid: this.currentUser.uid,
      displayName: this.currentUser.displayName,
      photoURL: this.currentUser.photoURL,
    };
    this.db.list<Chat>('chats').push(chat);
    this.chatForm.get('content').reset();
  }

}
