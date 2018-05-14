import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { UserData } from './models/user-data.model';


@Injectable()
export class AimService {
  convos: FirebaseListObservable<any[]>;
  messages: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase){
  }

  getBuddy(userId: string) {
    this.convos = this.database.list(`users/${userId}/chatList`);
    return this.convos;
  }

  getMessagesByUserId(userId: string) {
    this.messages = this.database.list(`users/${userId}/chatList/0/messages`);
    return this.messages;
  }

  appendMessage(newMessage: string, userId: string) {
    this.database.list(`users/${userId}/chatList/0/messages`).push(newMessage);
  }

}
