import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PlanifierdepService } from '../demo/services/planifierdep.service';

@Component({
  selector: 'app-planification-depenses',
  templateUrl: './planification-depenses.component.html',
  styleUrls: ['./planification-depenses.component.scss']
})
export class PlanificationDepensesComponent {
  allplanifications:any;
  constructor(private serv:PlanifierdepService){}
submitHandler(f: NgForm) {
    this.serv.newPlan(f.value).subscribe({
      next:(resp:any)=>{
        console.log("ajouté"+resp.montant)
      }
    })
}

getAll(){
  return this.serv.getAll().subscribe({
    next:(rep)=>{
      this.allplanifications=rep;
    }
  });
}
  ngOnInit(){
    console.log(this.getAll());
    this.getAll();
  }



}
