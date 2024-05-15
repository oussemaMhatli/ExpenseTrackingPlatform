/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionserviceService } from '../services/transactionservice.service';
import { transaction } from '../user-management/components/modeles/Transaction';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { ServiceTagsService } from '../services/service-tags.service';
import { Tags } from '../user-management/components/modeles/Tags';
import { BudgetserviceService } from '../services/budgetservice.service';
import { Budget } from '../user-management/components/modeles/Budget';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  @ViewChild('f') add!: NgForm;
  @ViewChild('tr') trie!: NgForm;


  constructor(private service: TransactionserviceService, private auth: AuthService, private servicetag: ServiceTagsService, private servicebudget: BudgetserviceService) { }
  newTransaction!: transaction
  decodedToken: any;
  useremail!: string;
  iduser: any;
  oldtransaction: transaction[] = [];
  transactionparrangdate: transaction[] = [];

  tabletags: Tags[] = []
  sortByDate: boolean = true;
  sortBymontant: boolean = true;
  noResultat: any

  montantBudget: any;
  datebudget:any;






  ngOnInit(): void {

    this.decodeToken();
    this.decodedToken = this.auth.decodetoken();


    this.montantBudget = localStorage.getItem('montat');
    // this.datebudget = localStorage.getItem('datefin');
    // console.log( new Date (this.datebudget));

    this.datebudget = localStorage.getItem('datefin');

  this.datebudget = new Date(this.datebudget);

console.log(this.datebudget);








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
        this.getbudget(this.iduser)

        console.log(newT.date);
        console.log(this.datebudget);



        newT.userId = this.iduser
        // if (this.add.valid == true) {


        //   if(+this.montantBudget>1000){alert("fot el budget")}
        //   else{
        //     this.service.addTransaction(newT).subscribe({

        //       next: (reponse) => {
        //         console.log("add", reponse);
        //         alert("ajouter transaction successfully")

        //         this.ngOnInit()

        //       },
        //       error: (err) => {
        //         console.log(err);
        //       }

        //     })
        //   }
        // }
      },
      error: (e) => { console.log(e); },





    })




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


  getAllTags() {
    this.servicetag.getAllTags().subscribe({
      next: (data: Tags[]) => {
        this.tabletags = data;
        console.log("tous les tags:", this.tabletags);

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
    if (form.startDate > form.endDate) {
      alert('La date de début est postérieure à la date de fin');
    }
    else {
      this.service.chercherpardate(this.iduser, form.startDate, form.endDate).subscribe({
        next: (data: any) => {
          console.log(data);
          this.transactionparrangdate = data
          if (this.transactionparrangdate.length == 0) this.noResultat = true;
          else this.noResultat = false;
          console.log(this.noResultat);

        },
        error: (err) => {
          console.log(err);

        }

      })



    }
  }

  getbudget(id: string) {
    this.servicebudget.getbudgetpariduser(id).subscribe({
      next: (mont: Budget[]) => {
        console.log(mont[0].montant);
        this.montantBudget = mont[0].montant
        localStorage.setItem("montat", mont[0].montant.toString())
        localStorage.setItem("datefin", mont[0].dateFin.toString())

      },
      error: (err) => {
        console.log(err);
      }
    })
    return this.montantBudget
  }
}


