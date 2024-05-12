import { Component, OnInit } from '@angular/core';
import { TransactionserviceService } from '../services/transactionservice.service';
import { transaction } from '../user-management/components/modeles/Transaction';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {


  constructor(private service:TransactionserviceService){}

  newTransaction!:transaction
  ngOnInit(): void {
   this.getAllTransactions();
   this.addtransaction(this.newTransaction)
  }

  getAllTransactions(){
    this.service.getall().subscribe({
      next:(response)=>{console.log(response);
      }
    })
  }




  addtransaction(newT:transaction){
    console.log("add",newT)
    this.service.addTransaction(newT).subscribe({
      next:(reponse)=> {console.log("add",reponse);},
      error:(err)=>{console.log(err);
      }

    })
  }



  }


