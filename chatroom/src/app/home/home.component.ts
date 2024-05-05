import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
import { ChatroomService } from '../chatroom.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule],  // Only FormsModule needed for ngModel
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  username: string = '';  // Store username input
  password: string = '';
  constructor(public chatService: ChatroomService) {}

  loginAttempt(){
    this.chatService.userExists(this.username)
      .then(exists => {
        if (exists) {
          console.log('User exists');
          this.login(this.username, this.password);
          // what if password fails?
        } else {
          console.log('User does not exist');
        }
      })
  }

  // createAccount(username: string, password: string) {
  createAccount() {
    // if (username == "" || password == "") return;
    if (this.username == "" || this.password == "") return;
    this.chatService.createAccount(this.username, this.password);
  }

  login(username: string, password: string) {
    if (username == "" || password == "") return;
    this.chatService.login(username, password);
  }

}
