import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Budget } from '../user-management/components/modeles/Budget';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetserviceService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost:3000/"



  getbudgetparid(userid: string): Observable<Budget> {
    return this.http.get<Budget>(this.url + "budget/user/" + userid)
  }
  ajouterbudget(budget: Budget) {
    return this.http.post(this.url + "budget/create", budget)
  }
  removebudget(id: string): Observable<Budget> {
    return this.http.delete<Budget>(this.url + "budget/" + id)
  }
  getbudgetpariduser(id: string):Observable<Budget[]> {
    return this.http.get<Budget[]>(this.url + "budget/user/" + id)
  }


}
