import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../modeles/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user!: User ;
  id!:string;
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private activeRoute:ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id'];
    this.getUserById(this.id)
 this.initForm()
  }

  initForm(): void {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]], // Initialize email with an empty string
      name: ["", [Validators.required]], // Initialize name with an empty string
      poste: ["", [Validators.required]], // Initialize poste with an empty string
      password: ["", [Validators.required]], // Initialize password with an empty string
      location: ["", [Validators.required]], // Initialize location with an empty string
    });


  }

getUserById(id:string) {
  this.userService.getUserById(id).subscribe(res=>{
    this.user = res;
    console.log(this.user);
    this.form.patchValue({
      email: this.user.email,
      name: this.user.name,
      poste: this.user.poste,
      location: this.user.location,
      password: this.user.password,

    });

  })
}
updateUser(){
  this.userService.updateUser(this.id,this.form.value).subscribe(res=>{
    this.toastr.success("updatet successfully !", 'success');
  },error=>{
    this.toastr.error("server error", 'Ooops');
  })
}
}
