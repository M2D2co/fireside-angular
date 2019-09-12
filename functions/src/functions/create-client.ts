import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin';

import { validateFirebaseIdToken } from './tokenValidation';

import * as express from 'express';
import * as cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));
// app.use(cookieParser);
app.use(validateFirebaseIdToken);

app.post('/create', async (req: any, res) => {

  const user = req.user;
  const client = req.body;
  const _userName = user.email.match(/(.*?)@/);

  const profile: Profile = {
    name: req.body.name,
    created: Date.now(),
    active: true,
    ownerId: user.uid
  }
  const userInfo: User = {
    access: 'client-owner',
    email: user.email,
    name: user.displayName || _userName[1]
  }

  const newUpdateKey = admin.database().ref(`/clients`).push().key;

  const locations = {};
  locations[`clients/${newUpdateKey}/profile`] = profile;
  locations[`clients/${newUpdateKey}/users/${user.uid}`] = userInfo;
  locations[`users/${user.uid}/clients/${newUpdateKey}`] = true;
  locations[`acl/${user.uid}/${newUpdateKey}/access`] = 'client-owner';

  try {
    const update = await admin.database().ref().update(locations);
    res.send(newUpdateKey);
  } catch (err) {
    console.log('error', err);
    throw(err);
  }
});


app.get('', (req, res) => {
  res.send(`Hello World`);
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Epic Fail!')
})

export const listener = functions.https.onRequest(app);

class Profile {
  active: true;
  created: number;
  name: string;
  ownerId: string
}

class User {
  access: 'client-owner';
  email: string;
  name?: string;
}