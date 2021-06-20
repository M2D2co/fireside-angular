import * as admin from 'firebase-admin';
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

export const apiOnGet_Chats_byEmail = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*')
  const email = request.query.email
  admin.auth().getUserByEmail(email)
    .then(userRecord => {
      return admin.database().ref('/chats').orderByChild('uid').equalTo(userRecord.uid).once('value')
    }).then(snapshot => {
      response.status(200).send(snapshot.val() || [])
      return
    }).catch(error => {
      response.status(404).send(error)
    })
})
