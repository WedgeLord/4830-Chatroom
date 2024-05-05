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
    this.http.get< {message: string, chats: Post[] }>("http://localhost:3000/history/" + sender + "/" + recipient).subscribe( (res) => {
      this.posts = res.chats;
      this.posts.sort((a, b) => { return a.time - b.time });
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

  userExists(username: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.get(`http://localhost:3000/userexists/${username}`).subscribe(
        (res) => {
          console.log('User exists');
          resolve(true);
        },
        (error) => {
          if (error.status === 404) {
            console.log('User does not exist');
            resolve(false);
          } else if (error.status === 500) {
            console.log('Error checking user');
            reject(error);
          } else {
            console.log('An unexpected error occurred');
            reject(error);
          }
        }
      );
    });
  }


  login(username: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.post<{message: string}>("http://localhost:3000/login", { username: username, password: password}).subscribe(
        (res) => {
          // if login succeeds, we navigate to chatroom
          this.router.navigate(["http://localhost:4200/chat"]);
          console.log(res.message);
          resolve(true);
        },
        (error) => {
          if (error.status === 400) {
            console.log('Bad Request: ', error.error.message);
          } else if (error.status === 500) {
            console.log('Internal Server Error: ', error.error.message);
          } else {
            console.log('An unexpected error occurred: ', error.error.message);
          }
          resolve(false);
        }
      );
    })
  }

  createAccount(username: string, password: string) {
    this.http.post<{message: string}>("http://localhost:3000/createaccount", { username: username, password: password}).subscribe( (res) => {
      // if account creation succeeds, we navigate to chatroom
      this.router.navigate(["http://localhost:4200/chat"]);
      console.log(res.message);
    });
  }

  logout() {
    this.username = "";
    // this.router.navigate([""]);
    this.router.navigate(["http://localhost:4200/"]);
  }

  getPostUpdateListener() {
    return this.postsUpdate.asObservable();
  }

}
