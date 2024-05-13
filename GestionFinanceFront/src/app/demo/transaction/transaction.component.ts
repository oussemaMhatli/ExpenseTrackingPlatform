/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionserviceService } from '../services/transactionservice.service';
import { transaction } from '../user-management/components/modeles/Transaction';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { ServiceTagsService } from '../services/service-tags.service';
import { Tags } from '../user-management/components/modeles/Tags';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  @ViewChild('f') add!: NgForm;
  @ViewChild('tr') trie!: NgForm;


  constructor(private service: TransactionserviceService, private auth: AuthService,private servicetag:ServiceTagsService) { }
  newTransaction!: transaction
  decodedToken: any;
  useremail!: string;
  iduser: any;
  oldtransaction: transaction[] = [];
  tabletags:Tags[]=[]
  sortByDate: boolean = true;
  sortBymontant: boolean = true;






  ngOnInit(): void {

    this.decodeToken();


    this.getAllTags();
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
    //console.log('Decoded Token:', this.decodedToken);
  }

  addtransaction(newT: transaction) {
    this.useremail = this.decodedToken.email
    //console.log(this.useremail);






    this.auth.getuserparemail(this.useremail).subscribe({
      next: (value: any) => {
        console.log("user", value._id);
        this.iduser = value._id
        this.getpariduser(this.iduser) // methide get transaction par id user
        newT.userId = this.iduser
        if (this.add.valid == true) {

          this.service.addTransaction(newT).subscribe({

            next: (reponse) => {
              console.log("add", reponse);
              alert("ajouter transaction successfully")

              this.ngOnInit()

            },
            error: (err) => {
              console.log(err);
            }

          })
        }
      },
      error: (e) => { console.log(e); },





    })


    console.log(this.add
    );

  }

  getpariduser(id: any) {


    this.service.getpariduser(id).subscribe({
      next: (res: any) => {
        // console.log("transactions",res);
        //console.log(res[0]._id);

        this.oldtransaction = res

      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  supprimer(id: string) {
    this.service.removetransaction(id).subscribe({
      next: (res) => {
        console.log('delete', res);
        alert("supprimer successfully")
        this.ngOnInit()
      },
      error: (err) => {
        console.log("error:", err);

      }
    })
  }


  getAllTags(){
    this.servicetag.getAllTags().subscribe({
     next:(data:Tags[])=>{
       this.tabletags=data;
       console.log("tous les tags:",this.tabletags);

     }
   })

 }


 toggleSortByDate() {

  this.sortByDate = !this.sortByDate;
}
toggleSortByMontant() {
  this.sortBymontant = !this.sortBymontant;
}







//partie afficher par datedebut et datefin



chercherpardated(form: any) {
  let formData = new FormData();
  if(form.startDate > form.endDate){
   alert('La date de début est postérieure à la date de fin');
  }
  else{

    formData.append("startDate", form.startDate);
    formData.append("endDate", form.endDate);
    formData.append("userId", this.iduser);

    this.service.chercherpardate(formData).subscribe({
      next : (data)=>{
        console.log(data);
      },
      error:(err)=>{
        console.log(err);

      }

    })



  }



}
}


