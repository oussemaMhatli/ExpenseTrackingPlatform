import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { error } from 'console';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export default class SignUpComponent {
  constructor(private router:Router,private serv:AuthService){}

  submitHandler(f:NgForm){
    this.serv.signup(f.value).subscribe({
      next:(res: any)=>{
        console.log(res['token']);
        const decoded = jwtDecode(res['token']);
        console.log('decoded Token', decoded);
        localStorage.setItem('access_token', res['token']);
        this.router.navigateByUrl('/analytics/analytics');
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
}
