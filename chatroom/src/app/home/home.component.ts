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
  constructor(public chatService: ChatroomService) {}

  loginAttempt(){
    this.chatService.userExists(this.username)
      .then(exists => {
        if (exists) {
          console.log('User exists');
        } else {
          console.log('User does not exist');
        }



      })
  }

}
