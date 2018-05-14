import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AimService } from '../aim.service';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';


@Component({
  selector: 'app-chat-display',
  templateUrl: './chat-display.component.html',
  styleUrls: ['./chat-display.component.css'],
  providers: [AimService]
})

export class ChatDisplayComponent implements OnInit {
  userId: string;
  conversation: FirebaseListObservable<any[]>;
  messages: FirebaseListObservable<any[]>;
  userName: FirebaseObjectObservable<any>;

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private aimService: AimService) { }

  ngOnInit() {
    this.userId = this.route.params['_value']['id'];
    this.conversation = this.aimService.getBuddy(this.userId);
    this.messages = this.aimService.getMessagesByUserId(this.userId);
    this.userName = this.aimService.getUserNameById(this.userId);
    // .subscribe(
    //   dataLastEmittedFromObserver => {
    //   this.conversation = dataLastEmittedFromObserver;
    // }
      // this.conversation = data.json();
      // this.conversation = Array.of(this.conversation);
  // );
  }

  sendMessage(userName, newMessage) {
    console.log(userName);
    this.aimService.appendMessage(`${userName}: ${newMessage}`, this.userId);
  }

}
