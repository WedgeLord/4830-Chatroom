import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from './chatroom.models'; // interface model
import { Subject } from 'rxjs';
import { Router } from '@angular/router'

@Injectable ({
  providedIn: 'root'
})

export class ChatroomService {
  username: String = "";
  private posts: Post[] = []; // our array of posts
  private users: String[] = []; //our array of users

  private postsUpdate = new Subject<Post[]>() // subject to track posts
  private usersUpdate = new Subject<String[]>() // subject to track users

  constructor(private http: HttpClient, private router: Router) {}

  getMessages(recipient: String) {
    this.http.get< {message: String, chats: Post[] }>("http://localhost:3000/history/" + this.username + "/" + recipient).subscribe( (res) => {
      //console.log(res);
      this.posts = res.chats;
      // this.posts.sort((a, b) => { return a.time - b.time });
      this.postsUpdate.next([...this.posts]);
      console.log(res.message);
      console.log(res.chats);
    });
  }

  // sendMessage(sender: string, recipient: string, content: string) {
  sendMessage(post: Post) {
    post.sender = this.username;
    this.http.post<{message: String}>("http://localhost:3000/send", post).subscribe( (res) => {
      // if post succeeds, we update our chat history
      this.posts.push(post);
      this.postsUpdate.next([...this.posts]);
      console.log(res.message);
    });
  }

  getUsers() {
    return this.http.get< {message: String, users: String[] }>("http://localhost:3000/directory").subscribe( (res) => {
      //console.log(res.users);
      this.users = res.users;
      this.usersUpdate.next([...this.users]);
      console.log(res.message);
      // update subject for user list
  });
}

  userExists(username: String): Promise<boolean> {
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


  login(username: String, password: String): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.post<{message: String}>("http://localhost:3000/login", { username: username, password: password}).subscribe(
        (res) => {
          // if login succeeds, we navigate to chatroom
          this.username = username;
          this.router.navigate(["/chat"]);
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

  createAccount(username: String, password: String) {
    this.http.post<{message: String}>("http://localhost:3000/createaccount", { username: username, password: password}).subscribe( (res) => {
      // if account creation succeeds, we navigate to chatroom
      this.username = username;
      this.router.navigate(["/chat"]);
      console.log(res.message);
    });
  }

  logout() {
    this.username = "";
    this.router.navigate([""]);
  }

  getUserUpdateListener() {
    return this.usersUpdate.asObservable();
  }
  getPostUpdateListener() {
    return this.postsUpdate.asObservable();
  }

}
