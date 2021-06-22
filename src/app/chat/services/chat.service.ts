import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Chat, ChatRecord } from '../chat.model';
import { map } from 'rxjs/operators';
import { Profile } from '../../models/profile.model';
import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;


@Injectable()
export class ChatService {

  constructor(
    private db: AngularFirestore,
    private fs: AngularFireStorage,
  ) { }

  /**
   * Returns an active observable of all chats in the log.
   */
  list(): Observable<Chat[]> {
    return this.db.collection<ChatRecord>('chats').valueChanges().pipe(
      map(records => records.map(
        record => ({
          contentText: record.contentText,
          contentImageURL: record.contentImageURL,
          displayName: record.displayName,
          avatarURL: record.avatarURL,
          timestamp: record.timestamp.toDate(),
        })
      ))
    );
  }

  /**
   * Stores a chat to the log and returns the new chat ID.
   */
  private saveChat(content: string | File, user: Profile): Promise<string> {
    return this.db.collection<ChatRecord>('chats').add({
      contentText: typeof content === 'string' ? content : '',
      uid: user.uid,
      displayName: user.displayName,
      avatarURL: user.avatarUrl,
      timestamp: Timestamp.now(),
    }).then(ref => ref.id);
  }

  /**
   * Posts either text content or an image file as a chat for the given user and returns the new chat ID.
   */
  async post(content: string | File, user: Profile): Promise<string> {
    const id = await this.saveChat(content, user);
    if (content instanceof File) {
      const filePath = `/images/${user.uid}/${id}/${content.name}`;
      // Upload the image
      const snapshot = await this.fs.upload(filePath, content);
      // Find the public download URL
      const imageUrl = await snapshot.ref.getDownloadURL();
      // Update the chat record with the image info
      this.db.doc(`/chats/${id}`).update({
        contentText: `User-provided image: ${content.name}`,
        contentImageURL: imageUrl,
      });
    }
    return id;
  }

}
