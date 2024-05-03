import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from './chatroom.models'; // interface model
import { Subject } from 'rxjs';

@Injectable ({
  providedIn: 'root'
})
export class ChatroomService {
  username: String = "";
  // private posts: Post[] = []; // our array of posts
  private posts: Map<String, Post[]> = new Map(); // our map of posts

  private postsUpdate = new Subject<Post[]>() // subject to track posts

  constructor(private http: HttpClient) {}

  getMessages(user: String) {
    this.http.get<{message: String, history: [{sender: String, chats: Post[]}]}>("http://localhost:3000/" + user).subscribe( (res) => {
      // a little inefficient, but we'll just update all chats even if nothing has changed
      res.history.forEach( (convo) => {
        this.posts.set(convo.sender, convo.chats);
      })
      console.log(res.message);
    });
  }

  sendMessage(targetUser: String, chat: Post) {
    //this.http.post<{target: String, message: Post}>("http://localhost:3000/", {target: targetUser, message: chat}).subscribe( (res) => {
    this.http.post<{message: Post}>("localhost:3000/user/" + targetUser, chat).subscribe( (res) => {
      // this code triggers only if post-request is successful
      if (this.posts.has(targetUser)) {
        this.posts.get(targetUser)!.push(chat);
        // CODE FOR SUBJECT<> UPDATE
      }
      else {
        this.posts.set(targetUser, [chat,]);
      }
      console.log(res.message);
    });
  }

}
