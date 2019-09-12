import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin';

import { validateFirebaseIdToken } from './tokenValidation';

import * as express from 'express';
import * as cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));
app.use(validateFirebaseIdToken);


/**
 * Add user access to a client
 */
app.post('/create', async (req: any, res) => {
  const requestUser = req.user;
  const request: Request = req.body;
  
  const locations = {};
  let userPayload;

  //  Cannot grand ownership to already existing client - 
  //  the owner is the user who created the client
  if (request.access === 'owner-access') {
    res.status(401).send('Cannot grant access level Owner');
    await Promise.reject(new Error('Cannot grant access level Owner'));
  }

  //  Make user requester is authorized to grant access
  const isAuthorized = await determineAuthorization(requestUser, request);
  if (!isAuthorized) {
    res.status(401).send('User is not authorized to grant permissions to this client');
    await Promise.reject(new Error('User is not authorized to grant permissions to this client'));
  }

  //  Get requester's uid
  const newUser = await getUserUid(request.email);
  //  Throw error if user not found
  if (newUser.errorInfo) {
    res.status(400).send(newUser.errorInfo.message);
    await Promise.reject(new Error(newUser.errorInfo.message));
  }
  

  //  Verify that new user doesn't already have permissions to the client
  const oldAccess: any = await getOldAccess(newUser.uid, request.clientId);
  if (oldAccess && oldAccess.access) {
    res.status(400).send('User already has permissions to this client');
    await Promise.reject(new Error('User already has permissions to this client'));
  }
  
  //  Set up user info to be added to client
  userPayload = {
    access: request.access,
    email: newUser.email,
    displayName: newUser.displayName || null,
    dateAdded: Date.now(),
    lastUpdatedBy: requestUser.uid
  }

  locations[`acl/${newUser.uid}/${request.clientId}`] = { access: request.access };
  locations[`clients/${request.clientId}/users/${newUser.uid}`] = userPayload;
  locations[`users/${newUser.uid}/clients/${request.clientId}`] = true;

  const update = await admin.database().ref().update(locations);
  res.send(update);
});

/**
 * update user access to a client
 */
app.post('/update', async (req: any, res) => {
  const requestUser = req.user;
  const request: Request = req.body;
  
  const locations = {};
  let userPayload;

  //  Cannot grand ownership to already existing client - 
  //  the owner is the user who created the client
  if (request.access === 'owner-access') {
    res.status(401).send('Cannot grant access level Owner');
    await Promise.reject(new Error('Cannot grant access level Owner'));
  }

  //  Make user requester is authorized to grant access
  const isAuthorized = await determineAuthorization(requestUser, request);
  if (!isAuthorized) {
    res.status(401).send('User is not authorized to grant permissions to this client');
    await Promise.reject(new Error('User is not authorized to grant permissions to this client'));
  }

  //  Get requester's uid
  const newUser = await getUserUid(request.email);
  //  Throw error if user not found
  if (newUser.errorInfo) {
    res.status(400).send(newUser.errorInfo.message);
    await Promise.reject(new Error(newUser.errorInfo.message));
  }

  //  Verify that updated user isen't client-owner
  //  Client-owner cannot be revoked
  const oldAccess: any = await getOldAccess(newUser.uid, request.clientId);
  if (oldAccess && oldAccess.access === 'client-owner') {
    res.status(401).send('Please contact support for project ownership transfers');
    await Promise.reject(new Error('Please contact support for project ownership transfers'));
  }
  
  //  Set up user info to be added to client
  userPayload = {
    access: request.access,
    email: newUser.email,
    displayName: newUser.displayName || null,
    dateAdded: request.dateAdded || null,
    updated: Date.now(),
    lastUpdatedBy: requestUser.uid
  }

  locations[`acl/${newUser.uid}/${request.clientId}`] = { access: request.access };
  locations[`clients/${request.clientId}/users/${newUser.uid}`] = userPayload;

  const update = await admin.database().ref().update(locations);
  res.send(update);
});

/**
 * remove user access to a client
 */
app.post('/remove', async (req: any, res) => {
  const requestUser = req.user;
  const request: Request = req.body;
  
  const locations = {};

  //  Make user requester is authorized to grant access
  const isAuthorized = await determineAuthorization(requestUser, request);
  if (!isAuthorized) {
    res.status(401).send('User is not authorized to grant permissions to this client');
    await Promise.reject(new Error('User is not authorized to grant permissions to this client'));
  }

  //  Get requester's uid
  const newUser = await getUserUid(request.email);
  //  Throw error if user not found
  if (newUser.errorInfo) {
    res.status(400).send(newUser.errorInfo.message);
    await Promise.reject(new Error(newUser.errorInfo.message));
  }

  //  Verify that updated user isen't client-owner
  //  Client-owner cannot be revoked
  const oldAccess: any = await getOldAccess(newUser.uid, request.clientId);
  if (oldAccess && oldAccess.access === 'client-owner') {
    res.status(401).send('Please contact support for project ownership transfers');
    await Promise.reject(new Error('Please contact support for project ownership transfers'));
  }

  locations[`acl/${newUser.uid}/${request.clientId}`] = { access: null };
  locations[`clients/${request.clientId}/users/${newUser.uid}`] = null;
  locations[`users/${newUser.uid}/clients/${request.clientId}`] = null;

  const update = await admin.database().ref().update(locations);
  res.send(update);
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Epic Fail!')
})

export const listener = functions.https.onRequest(app);

async function determineAuthorization(user, request) {
  
  let isAuthorized = false;
  let access: any;

  access = await admin.database().ref().child(`acl/${user.uid}`).once('value');
  access = access.val();

  if ( access[request.clientId]) {
    if (
        access.superAdmin === true
        || access[request.clientId].access === 'client-owner'
        || access[request.clientId].access === 'client-admin'
      ) {
        isAuthorized = true;
      } else {
        isAuthorized = false;
      }
  } else {
    isAuthorized = false;
  }

  return isAuthorized;

}

async function getUserUid(email) {
  try {
    const user = await admin.auth().getUserByEmail(email);
    const newUser: NewUser = {
      email: user.email,
      displayName: user.displayName || null,
      uid: user.uid
    }
    return newUser;
  } catch (err) {
    return (err);
  }
}

async function getOldAccess(uid, clientId) {
  let access = await admin.database().ref().child(`acl/${uid}/${clientId}`).once('value');
  access = access.val()
  return access;
}

class Request {
  clientId: string;
  email: string;
  access: string;
  dateAdded?: string;
}

class NewUser {
  email: string;
  displayName: string;
  uid: string;
}

class AccessLevel {
  access: string
}