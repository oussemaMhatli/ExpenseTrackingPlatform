import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  Link ="http://localhost:3000/auth";

  signin(u:User){
    return this.http.post(this.Link+"/signin",u);
  }
  signup(u:User){
    return this.http.post(this.Link+"/signup",u);
  }
}
