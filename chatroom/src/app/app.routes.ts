import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ChatroomComponent } from './chatroom/chatroom.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent,  },
    { path: 'chat', component: ChatroomComponent,  },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: ErrorPageComponent,  }
];

