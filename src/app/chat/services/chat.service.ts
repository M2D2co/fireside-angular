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
    // TODO: Replace this return with a list of chats from the "chats" collection
    return null;
  }

  search(email: string): Observable<Chat[]> {
    const url = `/api/search?email=${email}`;
    // TODO: Replace this return with the results of an HTTP call to the above URL
    return null;
  }

  /**
   * Stores a chat to the log and returns the new chat ID.
   */
  private saveChat(content: string | File, user: Profile): Promise<string> {
    // TODO: Replace this return with an add statement to save the chat, and return the new ID
    return null;
  }

  /**
   * Posts either text content or an image file as a chat for the given user and returns the new chat ID.
   */
  async post(content: string | File, user: Profile): Promise<string> {
    const id = await this.saveChat(content, user);
    if (content instanceof File) {
      const filePath = `/images/${user.uid}/${id}/${content.name}`;
      // TODO: Upload the image and update the chat record with the download URL
    }
    return id;
  }

}
