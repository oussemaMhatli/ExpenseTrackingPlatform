import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { StatService } from 'src/app/demo/services/stat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  totlExpanse:number=0
  token:any
  constructor(private stat:StatService){}
  ngOnInit(): void {

    this.token = localStorage.getItem("access_token");
    const decoded: any = jwtDecode(this.token);
    console.log('User ID:', decoded.id);
    this.getTotlaExpanse(decoded.id)
  }
  getTotlaExpanse(id:string){
    this.stat.getAllExpanse(id).subscribe({
      next:(res:number)=>{
        this.totlExpanse=res
      },
      error:(error:any)=>{
         console.log(error,"getAllexpanse")
      }
    })
  }
}
