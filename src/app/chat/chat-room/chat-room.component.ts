import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { User } from 'firebase';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { takeUntil } from 'rxjs/operators';

class Chat {
  content?: string;
  sentImage?: string;
  displayName: string;
  photoURL: string;
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
    private fs: AngularFireStorage,
  ) {
    this.chatForm = this.fb.group({
      content: [''],
      file: [''],
      image: [''],
    });
  }

  ngOnInit() {
    this.authenticationService.authInfo.pipe(takeUntil(this.destroyed$)).subscribe(user => {
      this.currentUser = user;
    });

    this.chats = this.db.list<Chat>('chats').valueChanges().pipe(takeUntil(this.destroyed$));
  }

  selectImage(event: any) {
    const fileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.chatForm.patchValue({ image: file});
    }
  }

  sendChat() {
    const content = this.chatForm.get('content').value;
    const image = this.chatForm.get('image').value;
    if (content) {
      this.sendMessage(content);
    } else if (image || image.name) {
      this.upload(image);
    } else {
      return false;
    }
  }

  sendMessage(message: string) {
    console.log('sendMessage', message);
    const chat: Chat = {
      content: message,
      timestamp: new Date(),
      uid: this.currentUser.uid,
      displayName: this.currentUser.displayName,
      photoURL: this.currentUser.photoURL,
    };
    this.db.list<Chat>('chats').push(chat);
    this.chatForm.get('content').reset();
  }

  upload(image: File) {
    console.log('upload', image);
    const uid = this.currentUser.uid;
    const ts = new Date();
    const filePath = `/images/${uid}/${ts.getTime()}/${image.name}`;
    this.fs.upload(filePath, image).then(async snapshot => {
      const imageUrl = await snapshot.ref.getDownloadURL();
      const chat: Chat = {
        sentImage: imageUrl,
        timestamp: ts,
        uid: this.currentUser.uid,
        displayName: this.currentUser.displayName,
        photoURL: this.currentUser.photoURL,
      };
      this.db.list<Chat>('chats').push(chat);
      this.chatForm.get('file').reset();
      this.chatForm.get('image').reset();
    });
  }

}
