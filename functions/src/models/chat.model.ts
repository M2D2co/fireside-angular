import { firestore } from 'firebase-admin';

export interface Chat {
  contentText: string;
  contentImageURL?: string;
  displayName: string;
  avatarURL: string;
  timestamp: Date;
}

export interface ChatRecord {
  contentText: string;
  contentImageURL?: string;
  uid: string;
  displayName: string;
  avatarURL: string;
  timestamp: firestore.Timestamp;
}
