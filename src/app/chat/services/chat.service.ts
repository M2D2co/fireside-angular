import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Chat, ChatRecord } from '../chat.model';
import { map } from 'rxjs/operators';
import { Profile } from '../../models/profile.model';
import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;
import { HttpClient } from '@angular/common/http';

interface ChatFromAPI extends Omit<Chat, 'timestamp'> {
  timestamp: string;
}

@Injectable()
export class ChatService {

  constructor(
    private db: AngularFirestore,
    private fs: AngularFireStorage,
    private http: HttpClient,
  ) { }

  private convertRecordToChat(record: ChatRecord): Chat {
    return {
      contentText: record.contentText,
      contentImageURL: record.contentImageURL,
      displayName: record.displayName,
      avatarURL: record.avatarURL,
      timestamp: record.timestamp.toDate(),
      uid: record.uid,
    };
  }

  /**
   * Returns an active observable of all chats in the log.
   */
  list(): Observable<Chat[]> {
    return null;
    // return this.db.collection<ChatRecord>('chats', ref => ref.orderBy('timestamp', 'desc')).valueChanges().pipe(
    //   map(records => records.map(this.convertRecordToChat))
    // );
  }

  search(email: string): Observable<Chat[]> {
    const url = `/api/search?email=${email}`;
    return null;
    // return this.http.get<ChatFromAPI[]>(url).pipe(
    //   map(chats => chats.map(
    //     chat => ({ ...chat, timestamp: new Date(chat.timestamp) })
    //   ))
    // );
  }

  /**
   * Stores a chat to the log and returns the new chat ID.
   */
  private saveChat(content: string | File, user: Profile): Promise<string> {
    return null;
    // return this.db.collection<ChatRecord>('chats').add({
    //   contentText: typeof content === 'string' ? content : '',
    //   uid: user.uid,
    //   displayName: user.displayName,
    //   avatarURL: user.avatarUrl,
    //   timestamp: Timestamp.now(),
    // }).then(ref => ref.id);
  }

  /**
   * Posts either text content or an image file as a chat for the given user and returns the new chat ID.
   */
  async post(content: string | File, user: Profile): Promise<string> {
    const id = await this.saveChat(content, user);
    // if (content instanceof File) {
    //   const filePath = `/images/${user.uid}/${id}/${content.name}`;
    //   // Upload the image
    //   const snapshot = await this.fs.upload(filePath, content);
    //   // Find the public download URL
    //   const imageUrl = await snapshot.ref.getDownloadURL();
    //   // Update the chat record with the image info
    //   this.db.doc(`/chats/${id}`).update({
    //     contentText: `User-provided image: ${content.name}`,
    //     contentImageURL: imageUrl,
    //   });
    // }
    return id;
  }

}
