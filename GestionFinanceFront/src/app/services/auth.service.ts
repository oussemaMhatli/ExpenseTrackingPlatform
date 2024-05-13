/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  Link ="http://localhost:3000/auth";
  url="http://localhost:3000/user/email/"
  url2="http://localhost:3000/user"

  jwtHelper = new JwtHelperService(); // Instantiate JwtHelperService

  getuserparemail(email: string) {
    return this.http.get(this.url +email);
  }
  

  signin(u:User){
    return this.http.post(this.Link+"/signin",u);
  }
  signup(u:User){
    return this.http.post(this.Link+"/signup",u);
  }


  getById(id:string){
    return this.http.get(`${this.url2}/${id}`);
  }
  





updateUser(id: number, user: User) {
  return this.http.patch<User>(`${this.url2}/${id}`, user);
}


  decodetoken() {
    const token = localStorage.getItem("access_token");
    if (!token) {
      return null;
    }
    return this.jwtHelper.decodeToken(token);
  }
}
