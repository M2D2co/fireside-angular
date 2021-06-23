import { Timestamp } from '@firebase/firestore-types';

export interface Chat {
  contentText: string;
  contentImageURL?: string;
  displayName: string;
  avatarURL: string;
  timestamp: Date;
  uid: string;
}

export interface ChatRecord {
  contentText: string;
  contentImageURL?: string;
  uid: string;
  displayName: string;
  avatarURL: string;
  timestamp: Timestamp;
}
