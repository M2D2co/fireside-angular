// import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';
// import { Chat, ChatRecord } from '../models/chat.model';

// admin.initializeApp();

// // eslint-disable-next-line camelcase
// export const apiOnGet_Chats_byEmail = functions.https.onRequest(async (request, response) => {
//   response.set('Access-Control-Allow-Origin', '*');

//   const email = typeof request.query.email === 'string' ? request.query.email : null;

//   if (!email) {
//     response.status(400).send('Could not find a valid email parameter');
//     return;
//   }

//   try {
//     const userRecord = await admin.auth().getUserByEmail(email);
//     const snapshot = await admin.firestore().collection('chats')
//       .where('uid', '==', userRecord.uid).orderBy('timestamp', 'desc').get();
//     const chats: Chat[] = snapshot.docs.map(doc => doc.data() as ChatRecord).map(record => ({
//       contentText: record.contentText,
//       contentImageURL: record.contentImageURL,
//       displayName: record.displayName,
//       avatarURL: record.avatarURL,
//       timestamp: record.timestamp.toDate(),
//     }));
//     response.status(200).send(chats);
//   } catch (e) {
//     console.error(e);
//     response.status(400).send(e.message);
//   }
// });
