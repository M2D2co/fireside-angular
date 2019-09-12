//  Firebase Cloud Function Libraries
import * as admin from 'firebase-admin';

// Import Functions
import * as Roles from './functions/roles';
import * as MessageToZapier from './functions/message-to-zapier';

  admin.initializeApp();

//  Export Functions
export const roles = Roles.listener
export const messageToZapier = MessageToZapier.listener