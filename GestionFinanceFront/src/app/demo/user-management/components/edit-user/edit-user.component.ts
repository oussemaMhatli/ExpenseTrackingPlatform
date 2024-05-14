import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user!: User ;
  id!:string;
  form!: FormGroup;  
  decodedToken: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: AuthService,
    private activeRoute:ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,private auth:AuthService
  ) { }

  ngOnInit(): void {  
    this.decodeToken(); // Décoder le jeton en premier
  }
  
  decodeToken() {
    this.decodedToken = this.auth.decodetoken();
    console.log('Decoded Token:', this.decodedToken);
  
    // Une fois le jeton décodé, appelez getUserById
    if (this.decodedToken && this.decodedToken.email) {
      this.getUserById(this.decodedToken.email);
    } else {
      console.error('Unable to get user details: Decoded token or email is undefined.');
    }
  }
  
  getUserById(email: string) {
    this.userService.getuserparemail(email).subscribe(res => {
      this.user = res;
      console.log(this.user.email);
    });
  }
  
  // initForm(): void {
  //   this.form = this.fb.group({
  //     email: ["", [Validators.required, Validators.email]], // Initialize email with an empty string
  //     name: ["", [Validators.required]], // Initialize name with an empty string
  //     poste: ["", [Validators.required]], // Initialize poste with an empty string
  //     password: ["", [Validators.required]], // Initialize password with an empty string
  //     location: ["", [Validators.required]], // Initialize location with an empty string
  //   });


  // }


// updateUser(){
//   this.userService.updateUser(this.id,this.form.value).subscribe(res=>{
//     this.toastr.success("updatet successfully !", 'success');
//   },error=>{
//     this.toastr.error("server error", 'Ooops');
//   })
// }
}
