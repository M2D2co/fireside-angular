import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Chat, ChatRecord } from '../models/chat.model';

admin.initializeApp();

// eslint-disable-next-line camelcase
export const apiOnGet_Chats_byEmail = functions.https.onRequest(async (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');

  const email = typeof request.query.email === 'string' ? request.query.email : null;

  if (!email) {
    response.status(400).send('Could not find a valid email parameter');
    return;
  }

  try {
    // TODO: Perform a search on chats for the given email and return the results below
    response.status(200).send([]);
  } catch (e) {
    console.error(e);
    response.status(400).send(e.message);
  }
});
