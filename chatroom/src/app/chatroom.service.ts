import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from './chatroom.models'; // interface model
import { Subject } from 'rxjs';

@Injectable ({
  providedIn: 'root'
})
export class ChatroomService {
  username: String = "";
  private posts: Post[] = []; // our array of posts

  private postsUpdate = new Subject<Post[]>() // subject to track posts

  constructor(private http: HttpClient) {}

  getMessages(user: String) {
    this.http.get<{messages: Post[]}>("http://localhost:3000/" + user).subscribe( (res) => {
      this.posts = res.messages;
    });
  }

  sendMessage(targetUser: String, chat: Post) {
    //this.http.post<{target: String, message: Post}>("http://localhost:3000/", {target: targetUser, message: chat}).subscribe( (res) => {
    this.http.post<{message: Post}>("localhost:3000/user/" + targetUser, chat).subscribe( (res) => {
      // this code triggers when post-request successful
      console.log(res.message);
      // add code for updating chat
    });
  }

}
