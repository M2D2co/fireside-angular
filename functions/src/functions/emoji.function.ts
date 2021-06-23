// import * as functions from 'firebase-functions';
// import { Chat } from '../models/chat.model';

// // eslint-disable-next-line camelcase
// export const dbOnCreate_Chats_Update = functions.firestore.document('/chats/{chatId}')
//   .onCreate(async (snapshot, context) => {
//     const chat = await snapshot.data() as Chat;

//     if (chat.contentText) {
//       console.log('Replacing lol with emoji on chat ' + context.params.chatId);
//       chat.contentText = chat.contentText.replace(/lol|LOL/g, '😂');
//       return snapshot.ref.update(chat);
//     }
//     return Promise.resolve();
//   });
