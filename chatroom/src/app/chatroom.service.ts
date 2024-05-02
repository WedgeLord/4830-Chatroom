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

  sendMessage(targetUser: String, chat: Post) {
    //this.http.post<{message: Post}>("localhost:3000/user/" + target, chat).subscribe( () => {
    this.http.post<{target: String, message: Post}>("http://localhost:3000/", {target: targetUser, message: chat}).subscribe( (res) => {
      // this code triggers when post-request successful
      console.log(res);
      // add code for updating chat
    });
  }

}
