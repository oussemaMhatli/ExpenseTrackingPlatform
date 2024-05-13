import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatService {
url="http://localhost:3000/transactions/"
  constructor(private http:HttpClient) { }
  getAllExpanse(userId: string): Observable<number> {
    let params = new HttpParams().set('userId', userId);

    return this.http.get<number>(`${this.url}gettotalexpense`,{params:params});
  }
  getExpansebymonth(userId: string): Observable<any> {
    let params = new HttpParams().set('userId', userId);

    return this.http.get<any>(`${this.url}exbencegroupedbydat`,{params:params});
  }}
