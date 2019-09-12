import * as functions from 'firebase-functions'


const request = require('request');
const ZAPIER_API = 'https://hooks.zapier.com/hooks/catch/1623760/rqt0p0';

export const listener = functions.database.ref('messages/{messageId}')
  .onWrite(async event => {
    const message: Message = event.after.val();
    console.log('message', message);

    request.post(ZAPIER_API, { form: message }, (error, response, body) => {
      const status: any = {};
      if (error) status.error = error;
      if (response) status.response = `${response.statusCode}:${response.statusMessage}`;
      if (body) status.body = body;
      console.log(status);
    });
  })

class Message {
  name: string;
  phone?: string;
  email: string;
  subject: string;
  timestamp: number;
  message: string
}
