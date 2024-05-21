import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlanifierdepService {

  constructor(private http:HttpClient) { }
  private url="http://localhost:3000/"

  newPlan(planification:any){
    return this.http.post(this.url+"planification-depenses",planification);
  }

  getAll(){
    return this.http.get(this.url+"planification-depenses");
  }
}
