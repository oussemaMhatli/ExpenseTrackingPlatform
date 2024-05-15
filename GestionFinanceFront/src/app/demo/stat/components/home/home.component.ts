import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { StatService } from 'src/app/demo/services/stat.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  totlExpanse:number=0
  token:any
  rapp=false;
  startDate!:Date
  endDate!:Date
  id:string=""
  mostExpensecat:any
  hidden=false;
  expanses:any[]=[]
  month!:string
  hiddenMonth=false;
  @Output() generateChartEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private stat:StatService,private router:Router){}
  ngOnInit(): void {

    this.token = localStorage.getItem("access_token");
    const decoded: any = jwtDecode(this.token);
    console.log('User ID:', decoded.id);
    this.getTotlaExpanse(decoded.id)
    this.id=decoded.id
   this.getmostExpansecat()
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
  showdate(){
this.rapp=!this.rapp
  }

 async generateRapport(){
 this.getallstat()
  }
  getallstat(){
    this.stat.generaterapport(this.id,this.startDate,this.endDate).subscribe({
      next:(res:any)=>{
        console.log("trans",res)
        this.expanses=res
        this.router.navigate(["/dash/pdf"],{ state: { expanses: this.expanses }})
      }
    })
  }
  getmostExpansecat(){
    this.stat.getMostExpansivecat(this.id).subscribe({
      next:(res:number)=>{
        this.mostExpensecat=res
        console.log( this.mostExpensecat,"MOSSSSSSSSSSSSST")

      },
      error:(error:any)=>{
         console.log(error,"getAllexpanse")
      }
    })
  }
  generatechart(){
    this.generateChartEvent.emit();

  }
}
