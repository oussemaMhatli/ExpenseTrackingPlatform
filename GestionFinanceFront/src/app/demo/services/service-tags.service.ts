import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tags } from '../user-management/components/modeles/Tags';

@Injectable({
  providedIn: 'root'
})
export class ServiceTagsService {

private apiurl="http://localhost:3000/tag"

  constructor(private http:HttpClient) { }


  getAllTags():Observable<Tags[]>
  {
    return this.http.get<Tags[]>(this.apiurl);
  }

  addtag(tag:Tags){
    return this.http.post(this.apiurl,tag)
  }

  deletetag(id:string){
    return this.http.delete(this.apiurl+"/"+id);
  }
}
