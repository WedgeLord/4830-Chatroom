import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule],  // Only FormsModule needed for ngModel
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  username: string = '';  // Store username input

  loginAttempt(){

  }

}
