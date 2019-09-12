import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { environment } from '../../../environments/environment';

export class ContactPayload {
  name: string;
  phone: string;
  email: string;
  message: string;
}

class Message {
  name: string;
  phone: string;
  email: string;
  message: string;
  subject: string;
  timestamp: number;
  constructor(
    contact: ContactPayload
  ) {
    this.name = contact.name;
    this.phone = contact.phone;
    this.email = contact.email;
    this.message  = contact.message;
    this.subject = environment.production ? 'Cirrostyle Contact' : '[TEST] Cirrostyle Contact';
    this.timestamp = Date.now();
  }
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  sendMessage(payload: ContactPayload) {
    const message: Message = new Message(payload);
    return this.db.list<Message>('/messages').push(message);
  }

}
