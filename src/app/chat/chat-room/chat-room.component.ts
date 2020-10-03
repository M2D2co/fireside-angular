import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { User } from 'firebase';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { takeUntil } from 'rxjs/operators';
import { ChatService } from '../services/chat.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';  // Unused import?
import { Chat } from '../chat.model';
@Component({
  selector: 'starter-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
  destroyed$: Subject<boolean> = new Subject();

  inputImage = false;

  currentUser: User;
  chatForm: FormGroup;
  chats: Observable<Chat[]>;

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private chatService: ChatService,
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

    this.chats = this.chatService.listChats().pipe(takeUntil(this.destroyed$));
  }

  selectImage(event: any) {
    const fileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.chatForm.patchValue({ image: file });
    }
  }

  async sendChat() {
    const content = this.chatForm.get('content').value;
    const image = this.chatForm.get('image').value;

    const chat: Chat = {
      content: content,
      timestamp: new Date(),
      uid: this.currentUser.uid,
      displayName: this.currentUser.displayName,
      photoURL: this.currentUser.photoURL,
    };
    if (content || (image && image.name)) {
      const key = await this.chatService.postChat(chat);
      if (image && image.name) {
        await this.chatService.uploadImage(chat, image, key);
      }
      this.chatForm.reset();
    }
  }

  toggleInputImage() {
    this.inputImage = !this.inputImage;
  }

}
