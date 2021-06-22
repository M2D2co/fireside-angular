import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject } from 'rxjs';
import { Chat } from '../chat.model';
import { ChatService } from '../services/chat.service';
import { takeUntil } from 'rxjs/operators';
import { Profile } from '../../models/profile.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnDestroy {
  private destroyed$: Subject<boolean> = new Subject();
  private currentUser: Profile | null = null;

  readonly chatForm: FormGroup;
  readonly chats: Observable<Chat[]>;
  inputImage = false;

  constructor(
    public auth: AngularFireAuth,
    private authSvc: AuthService,
    private fb: FormBuilder,
    private chatService: ChatService,
  ) {
    this.chatForm = this.fb.group({
      content: [''],
      file: [''],
      image: [''],
    });

    this.chats = this.chatService.list();

    this.authSvc.profile.pipe(takeUntil(this.destroyed$)).subscribe(user => {
      console.log('Chat User', user);
      this.currentUser = user;
    });
  }

  sendChat() {
    const content = this.chatForm.controls.content.value;
    const image = this.chatForm.controls.image.value;

    if (!this.currentUser) {
      console.error('User not logged in - cannot send chat');
      return;
    }

    this.chatService.post(image && image.name ? image : content, this.currentUser).then(() => {
      this.chatForm.reset();
    });
  }

  selectImage(event: any) {
    const fileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.chatForm.patchValue({ image: file });
    }
  }

  toggleInputImage() {
    this.inputImage = !this.inputImage;
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
