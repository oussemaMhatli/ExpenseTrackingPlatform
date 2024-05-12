/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { TransactionserviceService } from '../services/transactionservice.service';
import { transaction } from '../user-management/components/modeles/Transaction';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {


  constructor(private service:TransactionserviceService,private auth:AuthService){}
  newTransaction!:transaction
  decodedToken: any;
  useremail!:string;
  iduser:any;
  oldtransaction:transaction[]=[];

  ngOnInit(): void {

    this.decodeToken();


   //this.getAllTransactions();
   this.addtransaction(this.newTransaction)

  }

  // getAllTransactions(){
  //   this.service.getall().subscribe({
  //     next:(response)=>{console.log(response);
  //     }
  //   })
  // }


  decodeToken() {
    this.decodedToken = this.auth.decodetoken();
    console.log('Decoded Token:', this.decodedToken);
  }

  addtransaction(newT:transaction){
    this.useremail=this.decodedToken.email
    //console.log(this.useremail);
    this.auth.getuserparemail(this.useremail).subscribe({
      next:(value:any) => {
          console.log("user",value._id);
          this.iduser=value._id
          this.getpariduser(this.iduser) // methide get transaction par id user
          newT.userId=this.iduser
    this.service.addTransaction(newT).subscribe({

      next:(reponse)=> {console.log("add",reponse);
        alert("ajouter transaction successfully")
        this.ngOnInit()
      },
      error:(err)=>{console.log(err);
      }

    })
        },
        error: (e) =>{console.log(e);}




    })

  }

  getpariduser(id:any)
  {


    this.service.getpariduser(id).subscribe({
      next:(res:any)=>{
        console.log("transactions",res);
        console.log(res[0]._id);

        this.oldtransaction=res

      },
      error:(err)=>{
        console.log(err);

      }
    })
  }

  supprimer(id:string){
    this.service.removetransaction(id).subscribe({
      next:(res)=>{
         console.log('delete', res);
         alert("supprimer successfully")
         this.ngOnInit()
      },
      error:(err)=>{
        console.log("error:",err);

      }
    })
  }
  }


