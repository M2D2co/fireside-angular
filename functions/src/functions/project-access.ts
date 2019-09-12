import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin';

import { validateFirebaseIdToken } from './tokenValidation';

import * as express from 'express';
import * as cors from 'cors';

const clientAccessLevels = {
  'client-owner': 4,
  'client-admin': 3,
  'client-write': 2,
  'client-read': 1,
  'none': 0
}

const projectAccessLevels = {
  'project-admin': 3,
  'project-write': 2,
  'project-read': 1
}


const app = express();
app.use(express.json());
app.use(cors({ origin: true }));
app.use(validateFirebaseIdToken);


/**
 * Add user to project
 */
app.post('/', async (req: any, res) => {
  setupUserAccess(req, res, true);
});

/**
 * Edit user access to project
 */
app.put('/', async (req: any, res) => {
  setupUserAccess(req, res, false);
});

/**
 * Remove user access to project
 */
app.put('/removeAccess', async (req: any, res) => {
  const requestUser = req.user;
  const request: Request = req.body;
  const locations = {};

  //  Make user requester is authorized to remove access
  const aclInfo = await determineAuthorization(requestUser, request);
  if (!aclInfo.isAuthorized) {
    res.status(401).send('You are not authorized to edit user access for this project');
    await Promise.reject(new Error('You are not authorized to edit user access for this project'));
  }

  //  Get requester's uid
  const newUser = await getUserUid(request.email);
  //  Throw error if user not found
  if (newUser.errorInfo) {
    res.status(400).send(newUser.errorInfo.message);
    await Promise.reject(new Error(newUser.errorInfo.message));
  }

  const access: any = await getOldAccess(newUser.uid, request.clientId);
  delete access.projects[request.projectId];
  if (Object.keys(access.projects).length < 1 && access.access === 'none') {
    locations[`acl/${newUser.uid}/${request.clientId}`] = null;
    locations[`users/${newUser.uid}/clients/${request.clientId}`] = null;
  } else {
    locations[`acl/${newUser.uid}/${request.clientId}`] = access;
  }

  locations[`projects/${request.projectId}/users/${newUser.uid}`] = null;
  locations[`users/${newUser.uid}/projects/${request.projectId}`] = null;

  const update = await admin.database().ref().update(locations);
  res.send(update);
});



app.use(function (err, req, res, next) {
  res.status(500).send('Epic Fail!')
})

export const listener = functions.https.onRequest(app);

async function setupUserAccess(req, res, create) {
  const requestUser = req.user;
  const request: Request = req.body;
  const locations = {};
  let userPayload;

  // Make sure access level request is legit
  if (request.access !== 'project-admin' && request.access !== 'project-read' && request.access !== 'project-write' && request.access !== 'project-share') {
    res.status(400).send('Access level requested a not a legitimate value');
    await Promise.reject(new Error('Access level requested is not a legitimate value'));
  }

  //  Make user requester is authorized to grant access
  const aclInfo = await determineAuthorization(requestUser, request);
  if (!aclInfo.isAuthorized) {
    res.status(401).send('You are not authorized to edit user access for this project');
    await Promise.reject(new Error('You are not authorized to edit user access for this project'));
  }

  //  Get requester's uid
  const newUser = await getUserUid(request.email);
  //  Throw error if user not found
  if (newUser.errorInfo) {
    res.status(400).send(newUser.errorInfo.message);
    await Promise.reject(new Error(newUser.errorInfo.message));
  }

  const oldAccess = await getOldAccess(newUser.uid, request.clientId);
  //  Verify that new user doesn't already have access to project
  const verifiedAccess = verifyNewUserAccess(request.email, request.projectId, oldAccess, request.access, create);
  if (verifiedAccess.error) {
    res.status(400).send(verifiedAccess.error);
    await Promise.reject(new Error(verifiedAccess.error));
  }

  //  Set up user info to be added to client
  userPayload = {
    access: request.access,
    email: newUser.email,
    displayName: newUser.displayName || null,
    updated: Date.now(),
    dateAdded: Date.now(),
    lastUpdatedBy: requestUser.uid
  }

  locations[`acl/${newUser.uid}/${request.clientId}`] = verifiedAccess;
  locations[`projects/${request.projectId}/users/${newUser.uid}`] = userPayload;
  locations[`users/${newUser.uid}/projects/${request.projectId}`] = true;
  locations[`users/${newUser.uid}/clients/${request.clientId}`] = true;

  const update = await admin.database().ref().update(locations);
  res.send(update);
}

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
        || access.projects[request.projectId] === 'project.admin'
      ) {
        isAuthorized = true;
      } else {
        isAuthorized = false;
      }
  } else {
    isAuthorized = false;
  }

  return {
    isAuthorized: isAuthorized,
    oldAccess: access
  }

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
  access = access.val();
  return access;
}

function verifyNewUserAccess(email, projectId, oldAccess, accessRequested, create) {
  if (!oldAccess) {
    const newAccess = {
      access: 'none',
      projects: {}
    };
    newAccess.projects[projectId] = {
      access: accessRequested
    };
    return newAccess;
  } else if (oldAccess.access === 'client-write' && accessRequested === 'project-share') {
    return {
      error: `${email} already has write access at the client level.
      Giving this user read and share access would not diminish their access to this project.
      To allow ${email} the ability to share use the "Read, Write & Manage Users access level.`
    }
  } else if (clientAccessLevels[oldAccess.access] >= projectAccessLevels[accessRequested]) {
    return {
      error: `${email} already has this level of access or above granted at the client level.`
    }
  } else if (oldAccess.projects && oldAccess.projects[projectId] && oldAccess.projects[projectId].access && create) {
    return {
      error: `${email} already has access to this project`
    }
  } else {
    if (!oldAccess.projects) { oldAccess.projects = {}; }
    oldAccess.projects[projectId] = {
      access: accessRequested
    };
    return oldAccess;
  }
}

class Request {
  clientId: string;
  projectId: string;
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