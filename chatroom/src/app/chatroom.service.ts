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

  getMessages(sender: String, recipient: String) {
    this.http.get< {message: String, chats: Post[] }>("localhost:3000/chats/" + sender + "/" + recipient).subscribe( (res) => {
      this.posts = res.chats;
      this.postsUpdate.next([...this.posts]);
      console.log(res.message);
      console.log(res.chats);
    });
  }

  // sendMessage(sender: string, recipient: string, content: string) {
  sendMessage(post: Post) {

    // const post: Post={sender: sender, recipient: recipient, content: content, time: Date() };
    this.http.post<{message: String}>("http://localhost:3000/send", post).subscribe( (res) => {
      // this code triggers only if post-request is successful
      this.posts.push(post);
      this.postsUpdate.next([...this.posts]);
      console.log(res.message);
    });
  }

  getPostUpdateListener() {
    return this.postsUpdate.asObservable();
  }

}
