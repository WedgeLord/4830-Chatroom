import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';  // If using forms within the chatroom
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { Post } from '../chatroom.models'; // interface/model of post
import { Subscription, timer } from 'rxjs'; // to access posts from services
import { ChatroomService } from '../chatroom.service'; // service for the chatroom
import { RouterLink } from '@angular/router';  // If using RouterLink within the chatroom

@Component({
  selector: 'app-chatroom',
  standalone: true,
  imports: [RouterLink, CommonModule, NgFor, FormsModule],  // Include necessary imports
  // imports: [RouterLink, FormsModule],  // Include necessary imports
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})


export class ChatroomComponent implements OnInit, OnDestroy {

  posts: Post[]=[];
  updateInterval = timer(0, 5000);
  updateSub: Subscription = new Subscription;
  postsSub: Subscription = new Subscription;
  usersSub: Subscription = new Subscription;
  sender: String = "";
  recipient: String = "";
  message: String = "";

  users: String[]=[];

  constructor(public chatService: ChatroomService) {

  }


  onSendMessage() {
    if (this.recipient != "") {
      let chat: Post = {
        sender: '',
        recipient: this.recipient,
        content: this.message,
        time: Date.now(),  
      };
      this.chatService.sendMessage(chat);
    }

    this.message = "";
  }

  LoadChat(user: String){
    console.log(user);
    this.recipient = user;
    if (this.recipient != "") {
      this.chatService.getMessages(this.recipient);
    }
  }

  logout() {
      this.chatService.logout();
  }

  ngOnInit(){
    // set the users array
    if (this.chatService.username == "") {
      this.logout();
    }
    this.postsSub = this.chatService.getPostUpdateListener().subscribe((posts: Post[]) =>{
        this.posts = posts;
    });
        // update user list too
    this.usersSub = this.chatService.getUserUpdateListener().subscribe((users: String[]) =>{
        this.users = users;
    });
    // updates user list Subject and chat history Subject every 5 seconds
    this.updateSub = this.updateInterval.subscribe( () => { 
      if (this.recipient != "") {
        this.chatService.getMessages(this.recipient);
      }
      this.chatService.getUsers();
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.updateSub.unsubscribe();
    this.usersSub.unsubscribe();
  }

}

