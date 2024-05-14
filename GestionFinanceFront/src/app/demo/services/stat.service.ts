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
  }
  generaterapport(userId: string,dated:any,datef:any): Observable<any> {
    let params = new HttpParams();

    // Set the userId parameter

    // Set the dated parameter
    params = params.set('startDate', dated);

    // Set the datef parameter
    params = params.set('endDate', datef);
    params = params.set('userId', userId);

    return this.http.get<any>(`${this.url}date-range/`,{params:params});
  }
  getMostExpansivecat(userId: string): Observable<any> {
    let params = new HttpParams().set('userId', userId);

    return this.http.get<any>(`${this.url}getmostExpansecat`,{params:params});
  }
  getExpansivegroupedcat(userId: string): Observable<any> {
    let params = new HttpParams().set('userId', userId);

    return this.http.get<any>(`${this.url}exbencegroupedbycat`,{params:params});
  }
  getExpansivegroupedcatMonth(userId: string,month:string): Observable<any> {
    let params = new HttpParams().set('userId', userId);
    params = params.set('userId', userId);
    params = params.set('month', month);

    return this.http.get<any>(`${this.url}exbencegroupedbycatmonth`,{params:params});
  }
}
