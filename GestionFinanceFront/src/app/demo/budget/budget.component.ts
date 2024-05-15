/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, ViewChild } from '@angular/core';
import { Budget } from '../user-management/components/modeles/Budget';
import { NgForm } from '@angular/forms';
import { BudgetserviceService } from '../services/budgetservice.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent {
  @ViewChild('f') f!: NgForm;


  constructor(private servicebudget: BudgetserviceService, private auth: AuthService) { }
  newBudget!: Budget
  decodedToken: any;
  userid!: string
  oldbadget!:any

  ngOnInit(): void {
    this.decodeToken()
    this.userid = this.decodedToken.id
    console.log(this.userid);

    this.getbudget();


  }

  decodeToken() {
    this.decodedToken = this.auth.decodetoken();
    console.log('Decoded Token:', this.decodedToken);
  }





  getbudget(){
    console.log("id user",this.userid);

    this.servicebudget.getbudgetparid(this.userid).subscribe({
      next: (data) => {
        this.oldbadget = data
        console.log(this.oldbadget);

      }
    })
  }


  addBudget(budget: Budget) {

    if (this.f.valid) {


        budget.userId=this.userid

        this.servicebudget.ajouterbudget(budget).subscribe({
          next:(data)=>{
            console.log(data);

           alert("ajouter budget successfully")
           this.ngOnInit()


          },
          error:(err)=> {
            console.log(err);


          },
        })
      }


    else {
      console.log("erreur");

    }
  }


  removebudget(id:string){
    this.servicebudget.removebudget(id).subscribe({
      next:(data)=>{
        alert("supprimer successfully")
        console.log(data);
        this.ngOnInit()

      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
