import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';

export class ChatroomService {

  constructor(private http: HttpClient) {}
}
