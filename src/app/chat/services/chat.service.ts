import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { Chat } from '../chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private db: AngularFireDatabase,
    private fs: AngularFireStorage,
  ) { }

  listChats(): Observable<Chat[]> {
    return this.db.list<Chat>('chats').valueChanges();
  }

  postChat(chat: Chat): Promise<string> {
    return this.db.list<Chat>('chats').push(chat).then(ref => {
      return ref.key;
    });
  }

  uploadImage(chat: Chat, image: File, key: string): Promise<void> {
    const filePath = `/images/${chat.uid}/${chat.timestamp.getTime()}/${image.name}`;
    return this.fs.upload(filePath, image).then(async snapshot => {
      const imageUrl = await snapshot.ref.getDownloadURL();
      return this.db.object<Chat>(`chats/${key}`).update({ sentImage: imageUrl });
    });
  }

}
