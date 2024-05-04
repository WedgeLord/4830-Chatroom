import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';  // If using forms within the chatroom
import { RouterLink } from '@angular/router';  // If using RouterLink within the chatroom

import { Post } from '../chatroom.models'; // interface/model of post
import { Subscription } from 'rxjs'; // to access posts from services
import { ChatroomService } from '../chatroom.service'; // service for the chatroom

@Component({
  selector: 'app-chatroom',
  standalone: true,
  imports: [FormsModule, RouterLink],  // Include necessary imports
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})

export class ChatroomComponent implements OnInit, OnDestroy {

  posts: Post[]=[];
  private postsSub: Subscription = new Subscription;
  sender: string = "";
  recipient: string = "";

  constructor(public chatService: ChatroomService) {

  }

  onSendMessage(form: NgForm) {
    if (this.recipient != "") {
      let chat: Post = {
        sender: this.sender,
        recipient: this.recipient,
        content: form.value.content,
        time: Date.now().toString(),  // idk the best way to get time, this just counts the milliseconds after midnight
      };
      // this.chatService.sendMessage(form.value.sender, form.value.recipient, form.value.content);
      this.chatService.sendMessage(chat);
      form.resetForm;
  }
  }

  ngOnInit(){
    this.chatService.getMessages(this.sender, this.recipient);
    this.postsSub = this.chatService.getPostUpdateListener().subscribe((posts: Post[]) =>{
        this.posts = posts;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
  
}

