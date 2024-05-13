/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import * as bcrypt from 'bcryptjs';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  submitHandler(f: NgForm) {
    const { id, password, ...updateData } = f.value; // Exclure le champ 'id' et récupérer le mot de passe
    console.log(updateData); // Affichez les données à mettre à jour (sans 'id' et 'password')
  
    if (password) {
      const hashedPassword = bcrypt.hashSync(password, 10); // Hasher le nouveau mot de passe avec un salt de 10
      updateData.password = hashedPassword; // Remplacer le mot de passe brut par le mot de passe hashé
    }
  
    this.userService.updateUser(id, updateData).subscribe({
      next: (res) => {
        console.log("Mise à jour réussie : ", res);
      },
      error: (err) => {
        console.error("Erreur lors de la mise à jour du profil : ", err);
      }
    });
  }
  
  user!: User ;
  id!:string;
  form!: FormGroup;  
  decodedToken: any;


  constructor(
    private userService: AuthService,
    private auth:AuthService
  ) {}

  ngOnInit(): void {  
    this.decodeToken(); 
  }
  
  decodeToken() {
    this.decodedToken = this.auth.decodetoken();
    console.log('Decoded Token:', this.decodedToken);   
      // this.getUserByEmail(this.decodedToken.email);
    this.getUserById(this.decodedToken.id);
    
  }


  getUserById(id:string){
    return this.userService.getById(id).subscribe({
      next:(res)=>{
        this.user=res;
        console.log("useeeer"+this.user);
      }
    });
  }  
  
  // getUserByEmail(email: string) {
  //   this.userService.getuserparemail(email).subscribe({
  //     next:(res)=>{
  //       this.user=res;
  //       console.log("id est "+this.user._id);
  //       // console.log(typeof(this.user.id))
  //     }
  //   });
  // }

  
}
