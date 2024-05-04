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
  // private posts: Map<String, Post[]> = new Map(); // our map of posts

  private postsUpdate = new Subject<Post[]>() // subject to track posts

  constructor(private http: HttpClient) {}

  getMessages(sender: String, recipient: String) {
    this.http.get< {message: String, chats: Post[] }>("localhost:3000/chats/" + sender + "/" + recipient).subscribe( (res) => {
      this.posts = res.chats;
      this.postsUpdate.next([...this.posts]);
      console.log(res.message);
      console.log(res.chats);
    });
  }

  sendMessage(chat: Post) {
    this.http.post<{message: String}>("http://localhost:3000/send", chat).subscribe( (res) => {
      // this code triggers only if post-request is successful
      this.posts.push(chat);
      this.postsUpdate.next([...this.posts]);
      // let targetUser: String = chat.recipient;
      // if (this.posts.has(targetUser)) {
      //   this.posts.get(targetUser)!.push(chat);
      //   // CODE FOR SUBJECT<> UPDATE
      // }
      // else {
      //   this.posts.set(targetUser, [chat,]);
      // }
      console.log(res.message);
    });
  }

}
