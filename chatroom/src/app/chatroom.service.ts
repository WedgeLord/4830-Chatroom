import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from './chatroom.models'; // interface model
import { Subject } from 'rxjs';
import { Router } from '@angular/router'

@Injectable ({
  providedIn: 'root'
})

export class ChatroomService {
  username: string = "";
  private posts: Post[] = []; // our array of posts

  private postsUpdate = new Subject<Post[]>() // subject to track posts

  constructor(private http: HttpClient, private router: Router) {}

  getMessages(sender: string, recipient: string) {
    this.http.get< {message: string, chats: Post[] }>("localhost:3000/chats/" + sender + "/" + recipient).subscribe( (res) => {
      this.posts = res.chats;
      this.postsUpdate.next([...this.posts]);
      console.log(res.message);
      console.log(res.chats);
    });
  }

  // sendMessage(sender: string, recipient: string, content: string) {
  sendMessage(post: Post) {
    this.http.post<{message: string}>("http://localhost:3000/send", post).subscribe( (res) => {
      // if post succeeds, we update our chat history
      this.posts.push(post);
      this.postsUpdate.next([...this.posts]);
      console.log(res.message);
    });
  }

  login(username: string, password: string) {
    this.http.post<{message: string}>("http://localhost:3000/login", { username: username, password: password}).subscribe( (res) => {
      // if login succeeds, we navigate to chatroom
      this.router.navigate(["http://localhost:3000/chat"]);
      console.log(res.message);
  });
  }

  createAccount(username: string, password: string) {
    this.http.post<{message: string}>("http://localhost:3000/createaccount", { username: username, password: password}).subscribe( (res) => {
      // if account creation succeeds, we navigate to chatroom
      this.router.navigate(["http://localhost:3000/chat"]);
      console.log(res.message);
    });
  }

  getPostUpdateListener() {
    return this.postsUpdate.asObservable();
  }

}
