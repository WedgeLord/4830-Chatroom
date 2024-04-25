import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';

export const routes: Routes = [
    //{ path: 'chat', component: chatroom },
    { path: '', component: HomeComponent },
    { path: '**',  component: ErrorPageComponent },
];
