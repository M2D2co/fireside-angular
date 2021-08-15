import * as functions from 'firebase-functions';
import { Chat } from '../models/chat.model';

// eslint-disable-next-line camelcase
export const dbOnCreate_Chats_Update = functions.firestore.document('/chats/{chatId}')
  .onCreate(async (snapshot, context) => {
    // TODO: Replace "lol" with the 😂 emoji in new chat message (be sure to return a Promise)
  });
