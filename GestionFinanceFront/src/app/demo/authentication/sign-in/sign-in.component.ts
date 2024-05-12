/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User';
import { error, log } from 'console';
import { NgForm } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export default class SignInComponent {
  showError = false;

  constructor(private authServ:AuthService,private router:Router){}

  submitHandler(f: NgForm) {
    console.log(f.value);
    this.authServ.signin(f.value).subscribe({
      next:(response: any)=>{
        console.log(response['token']);
        const decoded = jwtDecode(response['token']);
        console.log('decoded Token', decoded);
        localStorage.setItem('access_token', response['token']);
        this.router.navigateByUrl('/transaction');
      },
      error:(error)=>{
        console.log(error);
        this.showError = true;

        this.onReset(f);
      }

    })
  }



  onReset(f: NgForm) {
    f.reset();
  }
}
