import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // If using forms within the chatroom
import { RouterLink } from '@angular/router';  // If using RouterLink within the chatroom

@Component({
  selector: 'app-chatroom',
  standalone: true,
  imports: [FormsModule, RouterLink],  // Include necessary imports
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent {

}

