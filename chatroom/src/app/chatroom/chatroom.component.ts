import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';  // If using forms within the chatroom
import { NgFor } from '@angular/common';

import { Post } from '../chatroom.models'; // interface/model of post
import { Subscription } from 'rxjs'; // to access posts from services
import { ChatroomService } from '../chatroom.service'; // service for the chatroom
import { RouterLink } from '@angular/router';  // If using RouterLink within the chatroom

@Component({
  selector: 'app-chatroom',
  standalone: true,
  imports: [RouterLink],  // Include necessary imports
  // imports: [RouterLink, FormsModule],  // Include necessary imports
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})

export class ChatroomComponent implements OnInit, OnDestroy {

  posts: Post[]=[];
  postsSub: Subscription = new Subscription;
  sender: string = "";
  recipient: string = "";

  users: string[]=[];

  constructor(public chatService: ChatroomService) {

  }


  onSendMessage(form: NgForm) {
    if (this.recipient != "") {
      let chat: Post = {
        sender: this.sender,
        recipient: this.recipient,
        content: form.value.content,
        time: Date.now(),  // idk the best way to get time, this just counts the milliseconds after midnight
      };
      this.chatService.sendMessage(chat);
      form.resetForm;
    }
  }

  LoadChat(user: string){
    // set the chat array based on user (service call)
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
    // this should be called when a recipient is selected, not on init
    // this.chatService.getMessages(this.sender, this.recipient);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}

