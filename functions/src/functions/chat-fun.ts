import * as functions from 'firebase-functions'
import { Chat } from '../models/chat.model';

export const dbOnCreate_Chats_Update = functions.database.ref('chats/{chatId}')
  .onCreate(async snapshot => {
    const chat: Chat = snapshot.val();

    if (chat.content) {
      console.log('Replacing lol with emoji')
      chat.content = chat.content.replace('lol', '😂')
      return snapshot.ref.update(chat)
    }
  })

export const dbOnWrite_Chats_Update = functions.database.ref('chats/{chatId}')
  .onUpdate(async change => {
    const chat: Chat = change.after.val();

    if (chat.sentImage && !chat.content) {
      chat.content = 'User-provided image'
      console.log('Adding user-provided image notification')
      return change.after.ref.update(chat)
    }
  })
